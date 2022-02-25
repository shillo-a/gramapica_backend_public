export const postUploadController = (req, res, next) => {

    const { file } = req;

    try {

        return res.status(200).send( {filename: file.filename} )

    } catch (err){
        next(err)
    }
}
