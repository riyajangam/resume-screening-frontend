# # from flask import Flask
# # from flask_cors import CORS

# # from routes.resume_routes import resume_bp

# # app = Flask(__name__)
# # CORS(app)

# # app.register_blueprint(resume_bp, url_prefix="/api")

# # if __name__ == "__main__":
# #     app.run(debug=True)

# # app_simple.py

# # app_simple.py - MINIMAL VERSION
# from flask import Flask
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# # Only import what you actually have
# try:
#     from routes.resume_routes import resume_bp
#     app.register_blueprint(resume_bp, url_prefix='/api/resume')
#     print("✓ Registered resume routes")
# except ImportError as e:
#     print(f"✗ Could not import resume routes: {e}")

# # Comment out or remove lines for modules you don't have
# # from routes.auth_routes import auth_bp  # Remove if file doesn't exist
# # from routes.screening_routes import screening_bp  # Remove if file doesn't exist

# # Add test routes
# @app.route('/')
# def home():
#     return "Resume Screening Backend is running!"

# @app.route('/health')
# def health():
#     return {"status": "healthy", "service": "resume-screening"}

# if __name__ == '__main__':
#     print("Starting Flask server...")
#     print("Visit: http://localhost:5000")
#     print("API endpoint: http://localhost:5000/api/resume/upload")
#     app.run(debug=True, port=5000)

# app_simple.py - Updated with better error handling and logging





# app_simple.py - Updated with correct imports
# import os
# import logging
# from flask import Flask, jsonify
# from flask_cors import CORS

# # Configure logging
# logging.basicConfig(level=logging.DEBUG)
# logger = logging.getLogger(__name__)

# def create_app():
#     app = Flask(__name__)
    
#     # Configure CORS
#     CORS(app, resources={r"/*": {"origins": "*"}})
    
#     # Configuration
#     app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024  # 5MB limit
#     app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), 'uploads', 'resumes')
#     app.config['ALLOWED_EXTENSIONS'] = {'pdf', 'docx', 'doc', 'txt'}
#     app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key')
    
#     # Ensure upload directory exists
#     os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    
#     # Import and register blueprints
#     try:
#         # Try relative imports first
#         from routes import resume_routes
#         app.register_blueprint(resume_routes.resume_bp, url_prefix='/api/resume')
        
#         logger.info("Successfully registered resume routes")
#     except ImportError as e:
#         logger.error(f"Failed to import routes: {e}")
#         # Create a fallback route
#         @app.route('/api/resume/upload', methods=['POST'])
#         def fallback_upload():
#             return jsonify({
#                 'success': False,
#                 'message': 'Routes not properly configured',
#                 'error': 'Please check backend setup'
#             }), 500
    
#     @app.route('/')
#     def home():
#         return jsonify({
#             'status': 'success',
#             'message': 'Resume Screening API is running',
#             'version': '1.0.0'
#         })
    
#     @app.route('/api/health')
#     def health():
#         return jsonify({
#             'status': 'healthy',
#             'service': 'resume-screening-backend'
#         })
    
#     @app.errorhandler(404)
#     def not_found(error):
#         return jsonify({'error': 'Not found'}), 404
    
#     @app.errorhandler(500)
#     def internal_error(error):
#         logger.error(f"Internal server error: {error}")
#         return jsonify({'error': 'Internal server error'}), 500
    
#     return app

# app = create_app()

# if __name__ == '__main__':
#     port = int(os.environ.get('PORT', 5000))
#     debug_mode = os.environ.get('FLASK_ENV') == 'development'
#     logger.info(f"Starting server on port {port}")
#     app.run(host='0.0.0.0', port=port, debug=debug_mode)







# app_simple.py - Updated to match frontend endpoint
# import os
# import logging
# from flask import Flask, jsonify
# from flask_cors import CORS

# # Configure logging
# logging.basicConfig(level=logging.DEBUG)
# logger = logging.getLogger(__name__)

# def create_app():
#     print("create app----------------------->")
#     app = Flask(__name__)
    
#     # Configure CORS
#     CORS(app, resources={r"/*": {"origins": "*"}})
    
#     # Configuration
#     app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024  # 5MB limit
#     app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), 'uploads', 'resumes')
#     app.config['ALLOWED_EXTENSIONS'] = {'pdf', 'docx', 'doc', 'txt'}
#     app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key')
    
#     # Ensure upload directory exists
#     os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    
#     # Import and register blueprints
#     print("triger------------------------>")
#     # try:
#     from routes.resume_routes import resume_bp
    
#     # Register WITHOUT prefix or with correct prefix based on frontend
#     # Option 1: If frontend is calling /resume/upload
#     app.register_blueprint(resume_bp, url_prefix='/')
#     # OR Option 2: If frontend is calling /api/resume/upload
#     # app.register_blueprint(resume_bp, url_prefix='/api')
    
#     logger.info("Successfully registered resume routes")
    
#     # except ImportError as e:
#     #     logger.error(f"Failed to import routes: {e}")
#     #     # Create a direct route for testing
#     #     @app.route('/resume/upload', methods=['POST'])
#     #     def test_upload():
#     #         return jsonify({
#     #             'success': True,
#     #             'message': 'Test endpoint is working',
#     #             'data': {
#     #                 'test': 'success',
#     #                 'endpoint': '/resume/upload'
#     #             }
#     #         })
    
#     @app.route('/')
#     def home():
#         return jsonify({
#             'status': 'success',
#             'message': 'Resume Screening API is running',
#             'version': '1.0.0',
#             'endpoints': {
#                 'upload': '/resume/upload (POST)',
#                 'health': '/health (GET)'
#             }
#         })
    
#     @app.route('/health')
#     def health():
#         return jsonify({
#             'status': 'healthy',
#             'service': 'resume-screening-backend',
#             'timestamp': 'now'
#         })
    
#     # Add a direct route for /resume/upload to test
#     @app.route('/resume/upload', methods=['GET'])
#     def upload_info():
#         return jsonify({
#             'method': 'POST',
#             'endpoint': '/resume/upload',
#             'required_fields': ['file', 'fullName', 'email'],
#             'allowed_files': ['pdf', 'docx', 'doc', 'txt']
#         })
    
#     @app.errorhandler(404)
#     def not_found(error):
#         return jsonify({
#             'error': 'Not found',
#             'message': 'The requested endpoint does not exist',
#             'available_endpoints': {
#                 'GET /': 'API info',
#                 'GET /health': 'Health check',
#                 'GET /resume/upload': 'Upload info',
#                 'POST /resume/upload': 'Upload resume'
#             }
#         }), 404
    
#     @app.errorhandler(500)
#     def internal_error(error):
#         logger.error(f"Internal server error: {error}")
#         return jsonify({'error': 'Internal server error'}), 500
    
#     return app

# app = create_app()

# if __name__ == '__main__':
#     port = int(os.environ.get('PORT', 5000))
#     debug_mode = os.environ.get('FLASK_ENV') == 'development'
#     logger.info(f"Starting server on port {port}")
#     logger.info(f"Upload folder: {app.config['UPLOAD_FOLDER']}")
#     logger.info("Available endpoints:")
#     logger.info("  GET  /              - API info")
#     logger.info("  GET  /health        - Health check")
#     logger.info("  GET  /resume/upload - Upload info")
#     logger.info("  POST /resume/upload - Upload resume")
#     app.run(host='0.0.0.0', port=port, debug=debug_mode)





from flask import Flask, jsonify
from flask_cors import CORS
from routes.resume_routes import resume_bp
import os

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024
    app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), 'uploads')

    # ✅ CORRECT PREFIX
    app.register_blueprint(resume_bp, url_prefix='/resume')

    @app.route('/')
    def home():
        return jsonify({"message": "Resume Screening API running"})

    @app.route('/health')
    def health():
        return jsonify({"status": "OK"})

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
