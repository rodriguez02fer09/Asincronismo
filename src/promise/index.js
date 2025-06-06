const somethingWillHappened = () => {
        return new Promise((resolve, reject) =>{

            if (false){
                resolve('hey!')
            }else{
                reject('whooopppss!')
            }
        })
}

somethingWillHappened()
.then(response => console.log (response))
.catch(err =>console.error(err))    





const somethingWillHappened2 = () =>{
    return new Promise ((resolve , reject ) => {
        if (true){
            setTimeout(() => {
                resolve('true')
            },  2000)
        }else{
            const error = new Error('whooop!');
            reject(error);
        }
    })
}
somethingWillHappened2()
.then(response => console.log(response))
.catch(err => console.error(err))