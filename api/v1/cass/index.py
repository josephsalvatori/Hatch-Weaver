from http.server import BaseHTTPRequestHandler

class handler(BaseHTTPRequestHandler):

	def do_POST(self):

		return

	def do_GET(self):
		self.send_response(200)
		self.send_header('Content-type','text/plain')
		self.end_headers()
		self.wfile.write('Hello, world!'.encode('utf-8'))
		return