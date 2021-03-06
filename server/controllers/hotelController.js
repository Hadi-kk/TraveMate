import Hotel from '../models/hotel.js';

//GET Routes

export const all_hotels = (req,res) => {
  Hotel.find()
    .then(result => {
      res.send(result);
    })
    .catch(err =>{
      console.log(err);
    })
}

export const all_hotels_detailed = (req,res) => {
  Hotel.find().populate('provider')
    .then(result => {
      res.send(result);
    })
    .catch(err =>{
      console.log(err);
    })
}

export const specific_hotel = (req,res) => {
  Hotel.find({_id:req.params.id}).populate('provider')
    .then(result => {
      res.send(result);
    })
    .catch(err =>{
      console.log(err);
    })
}


//POST Routes

export const create_hotel = (req,res,next) => {
  Hotel.create(req.body)
  .then((hotel) =>{
    console.log('Hotel has been added',hotel);
    res.statusCode=200;
    res.setHeader('Content-Type', 'application/json');
    res.json(hotel);
  },(err)=>next(err))
  .catch((err)=>next(err));
}


//PUT Routes

export const add_provider = (req, res, next) => {
  Hotel.findOneAndUpdate({_id:req.params.hid},{provider:req.params.pid},
    function(error,result){
      if(error){
        return next(error)
      }
      res.json(result)
    })
  
}

//DELETE Routes

export const delete_hotel = (req, res, next) => {
  Hotel.deleteOne({_id:req.params.id},function(error,results){
      if(error){
          return next(error)
      }
      res.json(results);
  })
}