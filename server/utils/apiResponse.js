const successResponse = (

    res,

    message,

    data = null

) => {

    res.json({

        success: true,

        message,

        data

    });

};

const errorResponse = (

    res,

    message

) => {

    res.json({

        success: false,

        message

    });

};

module.exports = {

    successResponse,

    errorResponse

};