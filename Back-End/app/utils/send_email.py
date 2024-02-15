from venv import logger
from ..config.env import settings
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

import smtplib


def send(receiver, token):
    # if(settings.SMTP_SERVER is None OR settings.SMTP_USERNAME is None OR settings.SMTP_PASSWORD):
    if (
        settings.SMTP_SERVER == ""
        or settings.SMTP_USERNAME == ""
        or settings.SMTP_PASSWORD == ""
    ):
        logger.error(
            "\033[91mSMTP settings are incomplete. Please ensure SMTP_SERVER, SMTP_USERNAME, and SMTP_PASSWORD are properly configured.\033[0m"
        )
        return
    website_url = "localhost:3000"
    sender = "from@example.com"
    message = MIMEMultipart("alternative")
    message["Subject"] = "multipart test"
    message["From"] = sender
    message["To"] = receiver
    text = "Error"
    html = f"""\
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        body {{
        font-family: Roboto, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
        }}
        .container {{
        max-width: 600px;
        margin: 20px auto;
        padding: 40px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }}
        .logo {{
        text-align: center;
        margin-bottom: 20px;
        }}
        .logo img {{
        max-width: 150px;
        height: auto;
        }}
        .message {{
        font-size: 16px;
        line-height: 1.5;
        margin-bottom: 20px;
        }}
        .button {{
        display: inline-block;
        padding: 12px 30px;
        background-color: #007bff;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        transition: background-color 0.2s ease;
        }}
        .button:hover {{
        background-color: #0056b3;
        }}
    </style>
    </head>
    <body>
    <div class="container">
        <div class="message">
        <p>Hi</p>
        <p>Someone (hopefully you!) requested a password reset for your account.</p>
        <p>Ready to get back in? Click the button below to choose a new password.</p>
        <p><a href="{website_url}/reset-password?token={token}" class="button">Reset Your Password Now</a></p>
        <p>If you didn't request this, no worries! Just ignore this email and your password will stay the same.</p>
        </div>
        <p>Best regards</p>
    </div>
    </body>
    </html>
    """

    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")
    message.attach(part1)
    message.attach(part2)

    with smtplib.SMTP(settings.SMTP_SERVER, 2525) as server:
        server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
        server.sendmail(sender, receiver, message.as_string())
