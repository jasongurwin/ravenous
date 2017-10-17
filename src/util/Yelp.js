const clientId = 'YWTvYMczr02O-okP1kqj6g'
const secret = '8ysH3vZ3Zjlqi86hRVg7lybqsRrtd9TE1GCuf23LM2ygEy5fZwKKiN3IMsCnBkks'
let accessToken = ''
let url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`


let Yelp = {

  getAccessToken(){

    if (accessToken){
      return new Promise(resolve =>
        resolve(accessToken));
      } else {
        return fetch(url, {method: 'POST'}).then(response=> { return response.json() }).then(jsonResponse => {accessToken=jsonResponse.access_token});
      }
    },


    search(term,location,sortBy){

      return Yelp.getAccessToken()
          .then(() =>
          {
              return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`
                  , {headers: {Authorization: `Bearer ${accessToken}`}});
          }).then(response => response.json()
        ).then(jsonResponse => {
              if (jsonResponse.businesses) {
                  return jsonResponse.businesses.map(business => {
                      return {
                        id: business.id,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.address1,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.zip_code,
                        category: business.categories[0].title,
                        rating: business.rating,
                        reviewCount: business.review_count
                      }; // end returning one business object
                  }); // end map over businesses
              } // end if response has businesses
          }); // end response
      } // end search function
  };

  export default Yelp
