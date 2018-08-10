var expect = function(a) {
              return {
                  toBe: function(b) {
                      console.log(a, 'vs', b, a === b);
                  },
                  toEqual(b) {
                      console.log(a, 'vs', b, a + '' === b + '');
                  },
                  toThrow(){
                      try{
                          a()
                      }catch(e){
                          console.log(e,"catch")
                      }
                  }
              };
