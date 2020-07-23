mongoimport -h ds119052.mlab.com:19052 -d heroku_3b3jcrqp -c available_payment_methods --file db_migration/availablepaymentmethods.json
mongoimport -h ds119052.mlab.com:19052 -d heroku_3b3jcrqp -c comments --file db_migration/comments.json
mongoimport -h ds119052.mlab.com:19052 -d heroku_3b3jcrqp -c paymentmethods --file db_migration/paymentmethods.json
mongoimport -h ds119052.mlab.com:19052 -d heroku_3b3jcrqp -c places --file db_migration/places.json
mongoimport -h ds119052.mlab.com:19052 -d heroku_3b3jcrqp -c privileges --file db_migration/privileges.json
mongoimport -h ds119052.mlab.com:19052 -d heroku_3b3jcrqp -c products --file db_migration/products.json
mongoimport -h ds119052.mlab.com:19052 -d heroku_3b3jcrqp -c purchasedproducts --file db_migration/purchasedproducts.json
mongoimport -h ds119052.mlab.com:19052 -d heroku_3b3jcrqp -c roles --file db_migration/roles.json
mongoimport -h ds119052.mlab.com:19052 -d heroku_3b3jcrqp -c tickets --file db_migration/tickets.json
mongoimport -h ds119052.mlab.com:19052 -d heroku_3b3jcrqp -c users--file db_migration/users.json
