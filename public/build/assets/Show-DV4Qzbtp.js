import{j as e,Y as b,a as d}from"./app-N1DU8MBc.js";import{N as g,F as u}from"./Footer-akOlemUt.js";import{i as p,q as m,r as f,s as j}from"./index-P9s4Df2-.js";const k=({newsEvent:a,relatedNews:s})=>{var c;const h=t=>new Date(t).toLocaleDateString("id-ID",{year:"numeric",month:"long",day:"numeric"}),x=t=>new Date(t).toLocaleDateString("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"}),o=typeof window<"u"?window.location.href:"",i=t=>{const n=encodeURIComponent(a.title),l=encodeURIComponent(o);let r="";switch(t){case"facebook":r=`https://www.facebook.com/sharer/sharer.php?u=${l}`;break;case"twitter":r=`https://twitter.com/intent/tweet?text=${n}&url=${l}`;break;case"whatsapp":r=`https://wa.me/?text=${n}%20${l}`;break;case"copy":navigator.clipboard.writeText(o),alert("Link berhasil disalin!");return}r&&window.open(r,"_blank","width=600,height=400")};return e.jsxs("div",{className:"min-h-screen bg-gray-50 font-Geologica",children:[e.jsx(b,{title:a.title}),e.jsx("div",{className:"relative z-20",children:e.jsx(g,{active:"berita-acara",forceBackground:!0})}),e.jsx("div",{className:"bg-white border-b pt-20",children:e.jsx("div",{className:"container mx-auto px-4 py-4",children:e.jsxs(d,{href:"/berita-acara",className:"inline-flex items-center gap-2 text-[#4bb0b2] hover:text-[#3a9597] font-semibold transition-colors duration-300",children:[e.jsx(p,{}),"Kembali ke Daftar Berita"]})})}),e.jsx("div",{className:"container mx-auto px-4 py-8",children:e.jsxs("div",{className:"max-w-4xl mx-auto",children:[e.jsxs("article",{className:"bg-white rounded-2xl shadow-lg overflow-hidden",children:[a.featured_image&&e.jsxs("div",{className:"relative h-64 md:h-96 bg-gradient-to-br from-[#4bb0b2] to-[#3a9597] overflow-hidden",children:[e.jsx("img",{src:`/storage/${a.featured_image}`,alt:a.title,className:"w-full h-full object-cover"}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"})]}),e.jsxs("div",{className:"p-6 md:p-10",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(m,{className:"text-[#4bb0b2]"}),e.jsx("span",{children:x(a.published_at)})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(f,{className:"text-[#4bb0b2]"}),e.jsxs("span",{children:["Oleh: ",((c=a.creator)==null?void 0:c.name)||"Admin"]})]})]}),e.jsx("h1",{className:"text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight",children:a.title}),a.excerpt&&e.jsx("div",{className:"bg-gray-50 border-l-4 border-[#4bb0b2] p-6 mb-8 rounded-r-lg",children:e.jsx("p",{className:"text-lg text-gray-700 font-medium italic",children:a.excerpt})}),e.jsxs("div",{className:"flex items-center gap-4 mb-8 pb-6 border-b border-gray-200",children:[e.jsx("span",{className:"text-gray-600 font-medium",children:"Bagikan:"}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("button",{onClick:()=>i("facebook"),className:"p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300",title:"Bagikan ke Facebook",children:e.jsx("svg",{className:"w-4 h-4",fill:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"})})}),e.jsx("button",{onClick:()=>i("twitter"),className:"p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors duration-300",title:"Bagikan ke Twitter",children:e.jsx("svg",{className:"w-4 h-4",fill:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"})})}),e.jsx("button",{onClick:()=>i("whatsapp"),className:"p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300",title:"Bagikan ke WhatsApp",children:e.jsx("svg",{className:"w-4 h-4",fill:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"})})}),e.jsx("button",{onClick:()=>i("copy"),className:"p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors duration-300",title:"Salin Link",children:e.jsx(j,{className:"w-4 h-4"})})]})]}),e.jsx("div",{className:"prose prose-lg max-w-none content-article",dangerouslySetInnerHTML:{__html:a.content}})]})]}),s.length>0&&e.jsxs("div",{className:"mt-16",children:[e.jsx("h2",{className:"text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center",children:"Berita Acara Lainnya"}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:s.map(t=>e.jsxs(d,{href:`/berita-acara/${t.slug}`,className:"bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group",children:[e.jsx("div",{className:"relative h-40 bg-gradient-to-br from-[#4bb0b2] to-[#3a9597] overflow-hidden",children:t.featured_image?e.jsx("img",{src:`/storage/${t.featured_image}`,alt:t.title,className:"w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"}):e.jsx("div",{className:"w-full h-full flex items-center justify-center text-white text-2xl opacity-50",children:"📰"})}),e.jsxs("div",{className:"p-4",children:[e.jsxs("div",{className:"text-xs text-gray-500 mb-2 flex items-center gap-1",children:[e.jsx(m,{className:"text-[#4bb0b2]"}),h(t.published_at)]}),e.jsx("h3",{className:"font-bold text-gray-800 line-clamp-2 group-hover:text-[#4bb0b2] transition-colors duration-300",children:t.title}),t.excerpt&&e.jsxs("p",{className:"text-sm text-gray-600 mt-2 line-clamp-2",children:[t.excerpt.substring(0,80),"..."]})]})]},t.id))})]})]})}),e.jsx(u,{}),e.jsx("style",{jsx:!0,children:`
                .content-article h1,
                .content-article h2,
                .content-article h3,
                .content-article h4,
                .content-article h5,
                .content-article h6 {
                    color: #2d3748;
                    font-weight: 600;
                    margin-top: 1.5rem;
                    margin-bottom: 1rem;
                }
                
                .content-article h1 { font-size: 2rem; }
                .content-article h2 { font-size: 1.75rem; }
                .content-article h3 { font-size: 1.5rem; }
                
                .content-article p {
                    margin-bottom: 1rem;
                    line-height: 1.7;
                    color: #4a5568;
                }
                
                .content-article ul,
                .content-article ol {
                    margin-bottom: 1rem;
                    padding-left: 1.5rem;
                }
                
                .content-article li {
                    margin-bottom: 0.5rem;
                    color: #4a5568;
                }
                
                .content-article blockquote {
                    border-left: 4px solid #4bb0b2;
                    background-color: #f7fafc;
                    padding: 1rem 1.5rem;
                    margin: 1.5rem 0;
                    font-style: italic;
                }
                
                .content-article img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 0.5rem;
                    margin: 1.5rem 0;
                }
                
                .content-article a {
                    color: #4bb0b2;
                    text-decoration: underline;
                }
                
                .content-article a:hover {
                    color: #3a9597;
                }

                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `})]})};export{k as default};
