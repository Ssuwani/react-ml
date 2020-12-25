from flask import Flask, request

import base64
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['POST'])
def hello_world():
    data = request.get_json(force=True)
    image_data = data['image']['result']  # data:image/png;base64,iVBORw0KGgo ~~~
    image_data = image_data[22:]  # iVBORw0KGgo ~~~~

    imgdata = base64.b64decode(image_data) # b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x07\x80\x00\x00\x048\x08\x06\x00\x00\x00\ ~~~~

    # for show
    # from PIL import Image
    # import io
    # image = Image.open(io.BytesIO(imgdata))
    # image.show()

    # save image
    filename = 'something.jpg'
    with open(filename, 'wb') as f:
        f.write(imgdata)
        print("이미지 저장완료")

    return 'Receive Successfully and Saved image'


if __name__ == '__main__':
    # app.run(host='0.0.0.0', debug=True, port=3333)
    app.run()
