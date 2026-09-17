
interface AEror{
    message:string,
    status:number,
    cause ?:unknown
}




export class ApplicationExecptions extends Error implements AEror{
    constructor(message:string,public status:number,cause ?:unknown){
        super(message,{cause})
    }
}
export class badRequestExxeption extends ApplicationExecptions{
    constructor(message:string,cause ?:unknown){
        super(message,400,cause)
        
    }
}
export class unauthorizedExcepetion extends ApplicationExecptions{
    constructor(message:string,cause ?:unknown){
        super(message,401,cause)
        
    }
}
export class forbiddenExcepetion extends ApplicationExecptions{
    constructor(message:string,cause ?:unknown){
        super(message,403,cause)
        
    }
}
export class notFoundExcepetion extends ApplicationExecptions{
    constructor(message:string,cause ?:unknown){
        super(message,404,cause)
        
    }
}
export class conflictException extends ApplicationExecptions{
    constructor(message:string,cause ?:unknown){
        super(message,409,cause)
        
    }
}