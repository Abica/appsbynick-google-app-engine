from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from handlers import RootHandler, BcdClockHandler, ClaxHandler, AtackHandler, FlipEmOffHandler, CellJumperHandler, BugSplatHandler, SupportHandler

application = webapp.WSGIApplication( [
    ( '/', RootHandler ),
    ( '/bcdclock', BcdClockHandler ),
    ( '/clax', ClaxHandler ),
    ( '/atack', AtackHandler ),
    ( '/flipemoff', FlipEmOffHandler ),
    ( '/celljumper', CellJumperHandler ),
    ( '/bugsplat', BugSplatHandler ),
    ( '/support', SupportHandler ),
  ],
  debug = True 
)

def main():
  run_wsgi_app( application )

if __name__ == "__main__":
  main()
