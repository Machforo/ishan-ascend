const fs = require('fs');
const filePath = 'src/pages/Hostel.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const regex = /{hostel\?\.images\?\.length > 0 && \([\s\S]*?<\/div>\s*\)\}/;

const replacement = `{[
              { title: "Hostel Rooms & Amenities", data: hostel?.images },
              { title: "Room Interiors", data: hostel?.roomInteriors },
              { title: "Washroom Facilities", data: hostel?.washroomImages },
              { title: "Dining Hall", data: hostel?.diningHallImages },
              { title: "Common Room", data: hostel?.commonRoomImages },
              { title: "Security & CCTV", data: hostel?.securityCctvImages }
            ].map((section, idx) => {
              if (!section.data || section.data.length === 0) return null;
              return (
                <div key={idx} className="reveal mt-12 pt-10 border-t mb-12">
                  <h3 className="text-2xl font-display font-bold text-navy mb-6 text-center">{section.title}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {section.data.map((photo: any, i: number) => {
                      const url = photo?.url || photo?.image || photo;
                      if (!url) return null;
                      return (
                        <div key={i} className="rounded-2xl overflow-hidden shadow-sm h-32 md:h-48 bg-slate-100 group">
                          <img 
                            src={url} 
                            alt={\`\${section.title} \${i + 1}\`} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}`;

content = content.replace(regex, replacement);
fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed Hostel.tsx');
