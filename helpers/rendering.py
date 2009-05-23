import os
from google.appengine.ext.webapp import template

def render_to_response( response, template_path, vars = {} ):
  path = os.path.join( "templates/", template_path )
  response.out.write( template.render( path, vars ) )

