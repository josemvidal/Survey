'''
Created on Apr 23, 2011

@author: jmvidal@gmail.com
http://jmvidal.cse.sc.edu

TODO: Test sequential questions.

TODO: 3D graphics research.

a change.
'''
import cgi
import os
from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext import db
from google.appengine.ext.webapp import template
from django.utils import simplejson as json
from datetime import tzinfo, timedelta, datetime #@UnresolvedImport

import logging

class MainPage(webapp.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if user:
            userInfo = ('<b>%s</b> <a href="%s">logout</a>') % (user.nickname(), users.create_logout_url('/'))
        else:
            templateValues = {'loginURL' : users.create_login_url(self.request.uri)}
            path = os.path.join(os.path.dirname(__file__), 'login.html')            
            self.response.out.write(template.render(path,templateValues))
            return
        templateValues ={'userInfo' : userInfo}
        path = os.path.join(os.path.dirname(__file__), 'index.html')
        self.response.out.write(template.render(path,templateValues))
        
class Upload(db.Model):
    owner = db.UserProperty() #the logged-in user, the one who uploaded it
    ownerNickname = db.StringProperty()
    date = db.DateTimeProperty() #time of submission
    file = db.TextProperty() # the file, its a json string
    keys = db.TextProperty() # all the question ids.
    fileName = db.StringProperty()
    id = db.IntegerProperty()
    
class Accumulator(db.Model):
    counter = db.IntegerProperty()

q = Accumulator.all()
if q.get() == None:
    a = Accumulator()
    a.counter = 0
    a.put()
    q = Accumulator.all()

key = q.get().key()

def incrementCounter():
    obj = db.get(key)
    obj.counter += 1
    obj.put()
    return obj.counter

def getNextId():
    return db.run_in_transaction(incrementCounter)

def isInteger(x):
    try:
        int(x)
        return True
    except:
        return False

class DataHandler(webapp.RequestHandler): #/data/*
    def get(self,id):
        user = users.get_current_user()
        if user:
            userInfo = ('<b>%s</b> <a href="%s">logout</a>') % (user.nickname(), users.create_logout_url('/'))
        else:
            templateValues = {'loginURL' : users.create_login_url(self.request.uri)}
            path = os.path.join(os.path.dirname(__file__), 'login.html')            
            self.response.out.write(template.render(path,templateValues))
            return
        templateValues ={'userInfo' : userInfo}
        if (id == ""):
            templateValues['uploads'] = Upload.all().filter('owner =', user).order('-date')
            path = os.path.join(os.path.dirname(__file__), 'filelist.html')
            self.response.out.write(template.render(path,templateValues))
        else: #/data/3 return data in .csv format
            theFile = Upload.all().filter('id =',int(id)).get()
            if not theFile:
                self.response.out.write('No survey with id=%s' % id)
                return
            contents = json.loads(theFile.file)
            questionKeys = json.loads(theFile.keys)
            #questionKeys = [k for k in contents[0]['answers']]
            #questionKeys.sort()
            if self.request.get('fmt') == 'csv':
                self.response.headers['Content-Type'] = 'application/octet-stream'
                self.response.headers['Content-Disposition'] = 'attachment;filename="%s.csv"' % theFile.fileName
                self.response.out.write('"protocolId","surveyName","start time","end time"')
                for k in questionKeys:
                    self.response.out.write(',"%s"' % k)
                self.response.out.write('\n')                    
                for survey in contents:                
                    self.response.out.write('%s,"%s","%s","%s"' % (survey['protocolId'], survey['surveyName'],
                                                                   survey['start'], survey['end']))
                    for k in questionKeys:
                        if survey['answers'].has_key(k):                        
                            ans = survey['answers'][k]
                            if isInteger(ans):
                                self.response.out.write(',%s' % ans)
                            else:
                                self.response.out.write(',"%s"' % ans)
                        else:
                            self.response.out.write(',"N/A"')
                    self.response.out.write('\n')
            else: #html
                templateValues['fileName'] = theFile.fileName
                table = '<table><thead><tr><th>protocolId</th><th>surveyName</th><th>start time</th><th>end time</th>'
                for k in questionKeys:
                    table += '<th>%s</th>' % k
                table += '</tr></thead><tbody>'
                for survey in contents:                
                    table += '<tr><td>%s</td><td>%s</td><td>%s</td><td>%s</td>' % (survey['protocolId'], survey['surveyName'],
                                                                   survey['start'], survey['end'])
                    for k in questionKeys:
                        if survey['answers'].has_key(k):
                            ans = survey['answers'][k]
                            table += '<td>%s</td>' % ans
                        else:
                            table += '<td>N/A</td>'
                    table += '</tr>'
                table += '</tbody></table>'
                templateValues['table'] = table
                path = os.path.join(os.path.dirname(__file__), 'datatable.html')            
                self.response.out.write(template.render(path,templateValues))
                
            
    
    def post(self,id):
        file = self.request.get('file')
        fileName = self.request.get('filename')
        keys = self.request.get('keys')
        user = users.get_current_user()
        if not user: 
            logging.info('User is not logged in, so will not let him post.')
            self.response.set_status(401)
            self.response.out.write('Not authorized. Please log in with your browser.')
            return #only logged in users can post
        nickname = user.nickname() if user else None
        up = Upload(date=datetime.now(), owner=user, ownerNickname=nickname, file=file, keys=keys, fileName=fileName, id=getNextId())
        up.put()

        
application = webapp.WSGIApplication([('/data/(.*)', DataHandler),
                                      ('/.*', MainPage)],
                                     debug=True)

def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()
