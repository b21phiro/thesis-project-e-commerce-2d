# thesis-project-e-commerce-2d
Thesis project with an e-commerce with the products rendered as traditional 2D.

## Initiate application.
1. Download / clone this repository, and put it in a desired folder.
2. Run ``npm install`` command in the terminal. This will install the required packages.
3. Run ``npm run build``. This will build the project into a ``dist`` folder.
4. Run ``npm run server``. This will run the server.
5. [optional] After step 3., you can launch the application using the ``dist/index.html`` file with desired web-server.

## To do a load-time measurement.
1. Go the ``./src/index.js`` file.
2. [optional] Set the amount of products to render by changing the amount at ``const amountOfProducts = 18;`` in the ``index.js`` file.
3. Comment out the line ``// loadTimeMeasurement.init(1000, amountOfProducts); <-- (1/2) Comment out this to measure load-times.`` in the ``index.js`` file.
4. Scroll down a bit, and comment out the ``loadTimeMeasurement.end(); // <-- (2/2) Comment out this to measure load-times.`` in the ``index.js`` file.
5. Run the ``npm run build`` command to compile.
6. Run the server by ``npm run server`` and navigate to ``localhost:3000``. Notice, that this will refresh your browser ``x`` amount of times.