 import fetchPhrase  from './fetchPhrase'
 import sum from './sum'

 test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('the data is a string', () => {
  const payload = {
    url: "/api/random-quote"
    }
    return fetchPhrase(payload.url).then(res => {

      expect(res).toBeDefined();
    });
  }
  )

//   function fetchPhrase(payload){
//     const requestOptions = {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//     }
//     return fetch(`${payload.url}`, requestOptions)
//             .then(response =>{
//                 return response.text()
//             })
// };