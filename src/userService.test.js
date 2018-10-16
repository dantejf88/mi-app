 import { fetchPhrase } from './services/userService'

 describe('Addition', () => {
    it('knows that 2 and 2 make 4', () => {
      expect(2 + 2).toBe(4);
    });
  })

test('the data is a string', () => {
  const payload = {
    url: "/api/random-quote",
    success: userConstants.PHRASE_SUCCESS
    }
    return fetchPhrase(payload).then(res => {
      let data = res.text()
      expect(data).toBe(String);
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