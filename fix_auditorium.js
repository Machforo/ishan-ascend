const fs = require('fs');

const filePath = 'src/pages/Auditorium.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const regex = /<div className="grid lg:grid-cols-2 gap-12 mt-12 pt-10 border-t mb-12">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/;

const replacement = `{auditorium?.interiorDetails?.length > 0 && (
              <div className="mt-12 pt-10 border-t mb-12">
                <div className="reveal">
                  <h3 className="text-xl font-bold text-navy mb-6">Interior Details</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {auditorium.interiorDetails.map((photo: any, i: number) => {
                      const url = photo?.url || photo?.image || photo;
                      if (!url) return null;
                      return (
                        <div key={i} className="rounded-2xl overflow-hidden shadow-sm h-32 md:h-40 bg-slate-100 group">
                          <img src={url} alt={\`Auditorium Interior \${i + 1}\`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}`;

content = content.replace(regex, replacement);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed Auditorium.tsx');
