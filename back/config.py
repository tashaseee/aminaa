class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:112233@localhost:5432/icecream'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    MAILJET_API_KEY = "abcde"
    MAILJET_SECRET_KEY = "abcde"
    MAILJET_SENDER = "@gmail.com"