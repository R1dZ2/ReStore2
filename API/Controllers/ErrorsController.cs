using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ErrorsController : BaseApiController
    {
        [HttpGet("notfound")]
        public ActionResult<string> GetNotFound()
        {
            return NotFound();
        }

        [HttpGet("badrequest")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest(new ProblemDetails { Title = "This is a bad request" });
        }

        [HttpGet("unauthorized")]
        public ActionResult<string> GetUnauthorized()
        {
            return Unauthorized();
        }

        [HttpGet("validationerror")]
        public ActionResult<string> GetValidationError()
        {
            ModelState.AddModelError("error1", "This is first error");
            ModelState.AddModelError("error2", "This is second error");
            return ValidationProblem();
        }

        [HttpGet("servererror")]
        public ActionResult<string> GetServerError()
        {
            throw new Exception("This is a server error");
        }
    }
}