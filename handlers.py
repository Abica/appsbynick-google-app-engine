from google.appengine.ext import webapp
from google.appengine.api import users
from helpers.rendering import render_to_response

class ApplicationHandler( webapp.RequestHandler ):
  def render_template( self, *args, **kwargs ):
    return render_to_response( self.response, *args, **kwargs )

  def login_required( self, return_url = None ):
    if return_url is None:
      return_url = self.request.uri

    if users.get_current_user() is None:
      self.redirect( users.create_login_url( return_url ) )

class RootHandler( ApplicationHandler ):
  def get( self ):
    self.render_template( "root/index.html" )

class BcdClockHandler( ApplicationHandler ):
  def get( self ):
    self.render_template( "root/bcdclock.html" )

class ClaxHandler( ApplicationHandler ):
  def get( self ):
    self.render_template( "root/clax.html" )

class AtackHandler( ApplicationHandler ):
  def get( self ):
    self.render_template( "root/atack.html" )

class FlipEmOffHandler( ApplicationHandler ):
  def get( self ):
    self.render_template( "root/flip_em_off.html" )

class CellJumperHandler( ApplicationHandler ):
  def get( self ):
    self.render_template( "root/cell_jumper.html" )

class BugSplatHandler( ApplicationHandler ):
  def get( self ):
    self.render_template( "root/bug_splat.html" )

class SupportHandler( ApplicationHandler ):
  def get( self ):
    self.render_template( "root/support.html" )
