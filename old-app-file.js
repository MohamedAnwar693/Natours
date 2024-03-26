const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

/**---------------------| MiddleWares |--------------------*/
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
    console.log('Hello from the middleware ==>');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

/**The first test */
// app.get('/', (req, res) => {
//     res
//         .status(200)
//         .send({message: 'Hello from the server side!', app: 'Natours'});
// });

// app.post('/', (req, res) => {
//     res.send('You can post to this endpoint...');
// });

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// app.get('/api/v1/tours', (req, res) => {
//     res.status(200).json({
//         status: 'success',
//         results: tours.length,
//         data: {
//             tours
//         }
//     });
// });

/**--------------------2) Route Handlers |---------------*/
const getAllTours = (req, res) => {
    console.log(req.requestTime);

    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    });
};


const getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    // fi (id > tours.length)
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    res.status(200).json({
        status: 'success',
        // results: tours.length,
        data: {
            tour
        }
    });
};


const createTour =  (req, res) => {
    // console.log(req.body);

    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);
    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        err =>  {
            res.status(201).json({
                status: 'success',
                data: {
                    tours: newTour
                }
            });
        }
    );
    // res.send('Done');
};


const updateTour =  (req, res) => {
    // if (!tour) {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour: 'Updated tour here...>'
        }
    });
};

const deleteTour = (req, res) => {
    // if (!tour) {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        });
    }
    res.status(500).json({ /// 204 mens no content con't send any data back
        status: 'error',
        message: 'This route is not yet defined!'
    });
};

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        data: {

        }
    })
};

const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        data: {

        }
    })
};

const getUser = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {

        }
    })
};

const updateUser = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {

        }
    })
};

const deleteUser = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {

        }
    })
};

//**********-------------|old Routes |------------------*********

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

/*-------------------- 3) new Routes ------------------------*/
const tourRouter = express.Router();
const userRouter = express.Router();
tourRouter.route('/')
    .get(getAllTours)
    .post(createTour);

tourRouter.route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

userRouter.route('/')
    .get(getAllUsers)
    .post(createUser);

userRouter.route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

    app.use('/api/v1/tours', tourRouter)
    app.use('/api/v1/users', userRouter)
/**-------------------------- 4) Start Server |-----------------------*/
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});




