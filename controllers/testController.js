export const testPostController = (req, res) => {
  try {
    const { name } = req.body;
    res.status(200).send({
      success: true,
      message: `Got the ${name}succesfully`,
    });
  } catch (error) {
    console.log(error);
  }
};
