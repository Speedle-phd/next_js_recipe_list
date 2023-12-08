export class CustomError extends Error{
   constructor(public message: string, public statuscode: number){
      super()
   }
}

export class UnauthorizedError extends CustomError{
   constructor(public message: string, public statuscode: number = 401){
      super(message, statuscode)
   }
}
export class BadRequestError extends CustomError{
   constructor(public message: string, public statuscode: number = 400){
      super(message, statuscode)
   }
}
export class NotFoundError extends CustomError{
   constructor(public message: string, public statuscode: number = 404){
      super(message, statuscode)
   }
}
export class ServerError extends CustomError{
   constructor(public message: string, public statuscode: number = 500){
      super(message, statuscode)
   }
}

