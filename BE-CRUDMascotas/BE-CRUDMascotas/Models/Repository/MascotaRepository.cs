using Microsoft.EntityFrameworkCore;

namespace BE_CRUDMascotas.Models.Repository
{
    public class MascotaRepository: IMascotaRepository
    {
        private readonly AplicationDBContext _context;

        public MascotaRepository(AplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Mascota> AddMascota(Mascota mascota)
        {
            _context.Add(mascota);
            await _context.SaveChangesAsync();
            return mascota;
        }

        public async Task DeleteMascota(Mascota mascota)
        {
            _context.Mascotas.Remove(mascota);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Mascota>> GetListMascotas()
        {
            return await _context.Mascotas.ToListAsync();
        }

        public async Task<Mascota> GetMascota(int id)
        {
            return await _context.Mascotas.FindAsync(id);
        }

        public async Task UpadateMascota(Mascota mascota)
        {
            var mascotaItem = await _context.Mascotas.FirstOrDefaultAsync(x => x.Id == mascota.Id);
            if(mascotaItem != null)
            {
                mascotaItem.Nombre = mascota.Nombre;
                mascotaItem.Edad = mascota.Edad;
                mascotaItem.Peso = mascota.Peso;
                mascotaItem.Color = mascota.Color;
                mascotaItem.Raza = mascota.Raza;

                await _context.SaveChangesAsync();
            }
        }
    }
}
