# Run App

### App file upload
- npm start 1

### App send email
- npm start 2

### App mongdo DB
- npm start 3


# About package.json:
### "nodemailer": "^6.3.0":
- Allow to download and update "nodemailer" if any new version release under 6.x.x (E.g: 6.4.1, 6.4.0, 6.3.9 ...)

### "nodemailer": "~6.3.0":
- Allow to download and update "nodemailer" if any new version release under 6.3.x (E.g: 6.3.9, 6.3.8, 6.3.1 ...)

### "nodemailer": "6.3.0"
- Only allow to download "nodemailer" version 6.3.0

### Meaning of "6.3.0"
- 6, if this number is increased (E.g from 6 to 7), it could be the major update: the library might has some breaking change update (E.g: the version 7.0.0 may not be comparable with the current version 6.3.0)
- 3, if this number is increased (E.g from 3 to 4), it could be the minor update: the library might add new functionality, non-breaking change update
- 0, if this number is increased (E.g from 0 to 1), it could be the patch update: the library might implement some bug fixed