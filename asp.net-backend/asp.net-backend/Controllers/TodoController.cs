using asp.net_backend.Controllers.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;

namespace asp.net_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ListContext _listContext;
        public TodoController(ListContext listContext)
        {
            _listContext = listContext;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<List>>> GetList()
        {
            if(_listContext.Lists == null )
            {
                return NotFound();
            }
            return await _listContext.Lists.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<List>> GetList(int id)
        {
            if (_listContext.Lists == null)
            {
                return NotFound();
            }
            var list = await _listContext.Lists.FindAsync(id);
            if(list == null)
            {
                return NotFound();
            }
            return list;
        }


        [HttpPost]
        public async Task<ActionResult<List>> PostList(List list)
        {
            _listContext.Lists.Add(list);
            await _listContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetList), new { Id = list.id }, list);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List>> PutList(int Id, List list)
        {
            if(Id != list.id)
            {
                return BadRequest();
            }

            _listContext.Entry(list).State = EntityState.Modified;
            try
            {
                await _listContext.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                throw;
            }

            return Ok();
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult> DeleteList(int Id)
        {
            if(_listContext.Lists == null)
            {
                return NotFound();
            }
            var list = await _listContext.Lists.FindAsync(Id);
            if(list == null)
            {
                return NotFound();
            }
            _listContext.Lists.Remove(list);
            await _listContext.SaveChangesAsync();

            return Ok();
        }

    }
}
