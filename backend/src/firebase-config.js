const admin = require('firebase-admin');
require('dotenv').config();

// Initialize Firebase Admin with your service account
try {
  admin.initializeApp({
    credential: admin.credential.cert({
      "type": "service_account",
      "project_id": "expenses-tracker-ccef5",
      "private_key_id": "b16672900b477df6b5e22dc0bb04cc2c3edea11b",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQClqcUtFIFenUfS\n8lWHkvcGdPKjxIyWF4Q+9X8mCsFTfWwmogFVl5EjsYaS3fz+utpx76tLqxfGwuZj\nHlqMsRLVUHydrA8/mMNJd50yk9OJ2+WLTiu9vh4GAImYBj01lXAW5IXkgSu4ZwAl\n8DUrFwa+rhWbXalh8Jdz1CFsgXNrQawz2Y3P3gNa8+SwGag/x3Mi10aEKUTt8J59\n+F5EkaUNqHnmNt60XNtSAOTaIAu8jotMCjHC67EmHJmPwdtGoajkeeLbQIoIcr5I\nxL+PVFcppKlD1mGXyXDk32IkylZMGG+5F3doq5/gQYUTpfAEwek+WJdFR7y4WpMD\nEPVIiYoHAgMBAAECggEAAIMOo3VyPLCdNhoX7cf1OPEmGpjt8uwo8e+Zi048XGRt\nJcPxIwIn2Kq1Ckhpi/KAS/+8Ik53J0q4yrMYrqTv99tQqPR/leF2wyLwH71cyZGJ\n3pWZyMsPt6NYyYGWYIVG9zAypzNiW2oNpnwnIG+YGLBwMKfGfqW5X5D/aXHMH9QX\nfCJLt7LypQbYEYfOJeQocEuw6KQlrc4tWzKatlIsvgZeFEjos95yDLnK8+fnzrk7\njyiG2V6h0ImE/GaX7EH9T9KYFbQrviYGXtZSdwTu7d86E94sT4JJkn343mCLI7k9\nW/X/ok4cMEzi1wtiWR6tvYHXK3lpgNGPwwi79ITtQQKBgQDR+sBB/SuToEqPeyxx\nJY3ecLwOQY/xTNd/iHFZM/TtbFL5XOGzG86wO7sQvntPyoDZhNoWYr1/n4BufwYd\nwAglYSEE8JJHuN7aXKkbVm0enSZfQiJGdI9nMpkcoOrXcUwpQQ2SBackyqS3zoIK\n/EP9RGtypf5Npxfqb9362o5EcwKBgQDJ+JPlPkvysEOfxupto9E/O4W9KZSH+vW5\nKbw5HiCP/kSa/Qo1hfCZgbcRB4gXF5dQ84Ue1UKmmdBDg/WcHf7IAiKybhVHXMcg\nTfXN5ytHGTPXZGFiuX1UBVhge7OIXPrOiATR18PbTCM18KHeRodYlM0m87UJyUL9\nPnsKrLvTHQKBgHSFwcrcwyHZAYc9wxvGy0N1K+Z9W3N8QNn0zXHC81gNlL3sXRMX\ni0sg2l4gVi2hIn+SybNCeAYqbQrkUnCP7/VOQRSMq6BBZummIfGZtFQYwQJ7oKmY\nZTvPSEgqxCdqJ+l8wBsYJ/iyu1WEs4WFF/Wj0jx9APH2l77w9S4PuoMhAoGASK/f\neidbafIpxDzwbZkBW4JudU+blvyopoTwqpW/HlNiGW1r2StlFbnrSoOtZLIm0Qlz\nJU+W9yJwI3xATnk1EoJCPnkDy3UGbQfhqMLDfokBcUk9Cyy6gByUW9TpHfBoix/E\nrEi8whW6rlT1zGsRlr2mv5gB1Y3LQBzWZ1cXGbkCgYA1LNJkHINi5i5U7F2VB9ed\nXMH8To1GCKOXVVqkcORpOSUNLtAhhjlqk5XSEi0jyNNFupNlYPyeU60TFAk+iFUX\n6Ix0JqAPUiVEbUziPH1aT1SL/NHM/NNNizddd3qEbSbXp1fvV7TBAP0WanUdQOcL\nsbe11q/1XhQROLtSck2Lcg==\n-----END PRIVATE KEY-----\n",
      "client_email": "firebase-adminsdk-cttgx@expenses-tracker-ccef5.iam.gserviceaccount.com",
      "client_id": "103049856799286568948",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-cttgx%40expenses-tracker-ccef5.iam.gserviceaccount.com",
      "universe_domain": "googleapis.com"
    })
  });
} catch (error) {
  console.error('Error initializing Firebase Admin:', error);
}

const db = admin.firestore();

module.exports = db;
