
export const getHomesController = ( (req, res) => {
  console.log('Home controller hit.')
  res.status(200).json({message: 'Homepage hit!'})
})






// change homes to home