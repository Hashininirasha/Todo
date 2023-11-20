using asp.net_backend.Controllers.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections;

namespace asp.net_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ListContext _listContext;
        private readonly ILogger<TodoController> _logger;

        public TodoController(ListContext listContext, ILogger<TodoController> logger)
        {
            _listContext = listContext;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<List>>> GetList()
        {
            try
            {
                if (_listContext.Lists == null)
                {
                    return NotFound("No lists found.");
                }

                return await _listContext.Lists.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error in GetList: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List>> GetList(int id)
        {
            try
            {
                if (_listContext.Lists == null)
                {
                    return NotFound("No lists found.");
                }

                var list = await _listContext.Lists.FindAsync(id);
                if (list == null)
                {
                    return NotFound($"List with Id {id} not found.");
                }

                return list;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error in GetList: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost]
        public async Task<ActionResult<List>> PostList(List list)
        {
            try
            {
                _listContext.Lists.Add(list);
                await _listContext.SaveChangesAsync();

                return CreatedAtAction(nameof(GetList), new { Id = list.id }, list);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error in PostList: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List>> PutList(int id, List list)
        {
            try
            {
                if (id != list.id)
                {
                    return BadRequest("Id in the URL does not match the Id in the request body.");
                }

                _listContext.Entry(list).State = EntityState.Modified;
                await _listContext.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error in PutList: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteList(int id)
        {
            try
            {
                if (_listContext.Lists == null)
                {
                    return NotFound("No lists found.");
                }

                var list = await _listContext.Lists.FindAsync(id);
                if (list == null)
                {
                    return NotFound($"List with Id {id} not found.");
                }

                _listContext.Lists.Remove(list);
                await _listContext.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error in DeleteList: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
