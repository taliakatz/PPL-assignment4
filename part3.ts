//question 1
export function* braid (gen1: Generator, gen2: Generator) {
    let ir1  = gen1.next();
    let ir2 = gen2.next();
    for (let i = 1; ; i++){
        if(i % 2 == 1){
            if(!ir1.done){
                yield ir1.value;
                ir1  = gen1.next();
            }
            else if(!ir2.done){
                yield ir2.value;
                ir2 = gen2.next();
            }
        }
        else if(!ir2.done){  //i % 2 == 0
            yield ir2.value;
            ir2 = gen2.next();
        }
        else if(!ir1.done){
            yield ir1.value;
            ir1  = gen1.next();
        }
        else break;
    }
}

//question 2
export function* biased (gen1: Generator, gen2: Generator) {
    let ir1  = gen1.next();
    let ir2 = gen2.next();
    for (let i = 1; ; i++){
        if(i % 2 == 1){
            if(!ir1.done){
                yield ir1.value;
                ir1  = gen1.next();
                if(!ir1.done){
                    yield ir1.value;
                    ir1  = gen1.next();
                }
            }
            else if(!ir2.done){
                yield ir2.value;
                ir2 = gen2.next();
            }
        }
        else if(!ir2.done){  //i % 2 == 0
            yield ir2.value;
            ir2 = gen2.next();
        }
        else if(!ir1.done){
            yield ir1.value;
            ir1  = gen1.next();
        }
        else break;
    }
}

function* take(n: number, g : Generator) { 
    for (let x of g) { 
        if (n <= 0) { 
            return; 
        } 
        n--;
        yield x;
    }   
}