//question 1
export const f = (x : number) : Promise<number> => {
    return new Promise<number>(
        (resolve, reject)=>
            x ===0 ? reject("cannot divide by 0") : resolve(1/x)
        )
}

export const g = (x : number) : Promise<number> => {
    return new Promise<number>(
        (resolve)=>
            resolve(x*x)
        )
}

export const h = (x : number) : Promise<number> =>{
    return g(x)
    .then((res) => {return f(res)
                    .then((res)=> {return res})
                    .catch((err)=>{console.error(err);
                                    return err})
    })
}

export const slower = <T,U>(pList: Promise<T|U>[]) : Promise<[number, T|U]> =>{
    return new Promise<[number, T|U]>(
        (resolve,reject)=>{
            let finished = 0;
            let p1:Promise<T|U> = pList[0];
            let p2:Promise<T|U> = pList[1];
            const markAsFinished = (id: number, res: T|U) => {
                finished++;
                if(finished === 2){
                    resolve([id, res]);
                }
            }
            p1.then((res) => markAsFinished(0, res)).catch((err) => {console.error("a promise failed");
                                                                    reject(err);});
            p2.then((res) => markAsFinished(1, res)).catch((err) => {console.error("a promise failed");
                                                                    reject(err);});
        })  
}

