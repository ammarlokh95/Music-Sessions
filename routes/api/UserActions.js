import User from '../../models/user';

export const PostUserRoute = (req, res) => {
  const data = req.body;
  if (data) {
    console.log(data);
    // User.findOneAndUpdate(
    //   {
    //     spotify_id: data.spotify_id,
    //     email: data.email,
    //   },
    //   data,
    //   { upsert: true, new: true, runValidators: true },
    //   (err, doc) => {
    //     if (err) {
    //       // handle error
    //     } else {
    //       // handle doc
    //     }
    //   },
    // );
  }
};

export const GetUserRoute = (req, res) => {
  const { id } = req.param;
  if (id) {
    User.findOne({ spotify_id: id }, (err, doc) => {
      if (err) {
        // Handle error
      } else {
        // Handle doc
      }
    });
  }
};
