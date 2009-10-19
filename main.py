from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from handlers import RootHandler, BcdClockHandler, ClaxHandler, AtackHandler, FlipEmOffHandler, SupportHandler

application = webapp.WSGIApplication( [
    ( '/', RootHandler ),
    ( '/bcdclock', BcdClockHandler ),
    ( '/clax', ClaxHandler ),
    ( '/atack', AtackHandler ),
    ( '/flipemoff', FlipEmOffHandler ),
    ( '/support', SupportHandler ),
  ],
  debug = True 
)

def main():
  run_wsgi_app( application )

if __name__ == "__main__":
  main()
