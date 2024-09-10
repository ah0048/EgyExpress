# #!/usr/bin/python3
from models import storage
from api.v1.views import app_views
from flask import Flask, make_response, jsonify, render_template
from flask_cors import CORS
from flask_jwt_extended import JWTManager


app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = "975d6edcdf6f55be0ec1e5e94d9eef14969bfe434d27cf283bb7fc9d6f97157c"
jwt = JWTManager(app)
app.register_blueprint(app_views)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.teardown_appcontext
def close_db(error):
    """ Close Storage """
    storage.close()

@app.route('/')
def index():
    return render_template('test.html')

@app.errorhandler(404)
def not_found(error):
    """ 404 Error
    ---
    responses:
      404:
        description: a resource was not found
    """
    return make_response(jsonify({'error': "Not found"}), 404)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
