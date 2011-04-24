'''
Created on Apr 23, 2011

@author: jmvidal
'''
import cgi
import os

from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext import db
from google.appengine.ext.webapp import template
from google.appengine.api import memcache
from django.utils import simplejson as json

import logging

class MainPage(webapp.RequestHandler):
    def get(self):
        self.response.out.write('<html><body><h1>USC Survey iphone/ipad App</h1><p><a href="survey/index.html">Go to app</a>.</p></body></html>')
        
        
application = webapp.WSGIApplication([('/.*', MainPage)],
                                     debug=True)

def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()
