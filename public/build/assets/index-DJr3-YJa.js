import{j as d}from"./app-DPBPjsud.js";import{D as ft}from"./DefaultLayout-fsByN9bI.js";import{C as Q}from"./CardDataStats-La4-1UVu.js";import{u as j,w as pt}from"./xlsx-DjuO7_Ju.js";import"./flowbite.min-Dyi2Wf9s.js";import"./index-CDcaZBKG.js";import kt from"./RekapPemasukan-BLwZ9TLf.js";import Ct from"./RekapPengeluaran-YO1bfPgD.js";import"./sweetalert2.esm.all-5zhdP7Ax.js";import"./index-dX6QUltf.js";const yt=({laporanPrivate:c,laporanPengeluaranPrivate:a,bulan:$,tahun:A,nextMonth:tt,nextYear:st,prevMonth:ot,prevYear:it,paketPrivate:E})=>{const dt=(k,i)=>{Array.isArray(k)||(k=[]),Array.isArray(i)||(i=[]);const L=k.reduce((f,u)=>f+(u.totalpemasukan||0),0),g=i.reduce((f,u)=>f+(u.totalpengeluaran||0),0),T=L-g,h=k.reduce((f,u)=>{if(!E||!u.pakets)return f;let b=0;return E.forEach(R=>{const S=u.pakets[R.id]?parseInt(u.pakets[R.id]):0;b+=S}),f+b},0);return{totalLaba:T,totalProfit:L,totalOutcome:g,totalStudents:h}},{totalLaba:et,totalProfit:X,totalOutcome:Y,totalStudents:lt}=dt((c==null?void 0:c.data)||[],(a==null?void 0:a.data)||[]),ct=(k,i,L,g)=>{const T=j.book_new(),h=t=>typeof t=="number"?t:parseInt(t,10)||0,f=L||[],u=[],b=3+f.length+7+1,R=[`LAPORAN PEMASUKAN BULAN ${$.toUpperCase()} ${A}`];for(let t=1;t<b;t++)R.push("");R.push(`LAPORAN PENGELUARAN BULAN ${$.toUpperCase()}`),u.push(R);const S=["Hari","Tanggal","Nama"];f.forEach(t=>{S.push(`${t.nama_paket} (${t.harga.toLocaleString()})`)}),S.push("Total Biaya","Daftar","Modul","Kaos","Kas","Lain Lain","Jumlah","");const v=["Pembuat Laporan","Detail Gaji Private","ATK","Sewa","Intensif","Lisensi","THR","Lain Lain","Jumlah","Albri"],y=[...S,...v];u.push(y);const D=(t,o)=>t.pakets&&t.pakets[o]?parseInt(t.pakets[o]):0,x=new Map;k&&k.data&&k.data.forEach(t=>{const o=t.tanggal;x.has(o)||x.set(o,{hari:t.hari,tanggal:t.tanggal,pemasukan:{nama:[],pakets:{},totalbiaya:0,daftar:0,modul:0,kaos:0,kas:0,lainlain:0,total:0},pengeluaran:{pembuat:[],gajiDetail:[],atk:0,sewa:0,intensif:0,lisensi:0,thr:0,lainlain:0,total:0}});const l=x.get(o);t.user&&t.user.name&&(l.pemasukan.nama.includes(t.user.name)||l.pemasukan.nama.push(t.user.name)),f.forEach(r=>{l.pemasukan.pakets[r.id]||(l.pemasukan.pakets[r.id]=0),l.pemasukan.pakets[r.id]+=D(t,r.id)}),l.pemasukan.totalbiaya+=h(t.totalbiaya),l.pemasukan.daftar+=h(t.daftar),l.pemasukan.modul+=h(t.modul),l.pemasukan.kaos+=h(t.kaos),l.pemasukan.kas+=h(t.kas),l.pemasukan.lainlain+=h(t.lainlain),l.pemasukan.total+=h(t.totalpemasukan)}),i&&i.data&&i.data.forEach(t=>{const o=t.tanggal;x.has(o)||x.set(o,{hari:t.hari,tanggal:t.tanggal,pemasukan:{nama:[],pakets:{},totalbiaya:0,daftar:0,modul:0,kaos:0,kas:0,lainlain:0,total:0},pengeluaran:{pembuat:[],gajiDetail:[],atk:0,sewa:0,intensif:0,lisensi:0,thr:0,lainlain:0,total:0}});const l=x.get(o);t.user&&t.user.name&&(l.pengeluaran.pembuat.includes(t.user.name)||l.pengeluaran.pembuat.push(t.user.name));let r=!1;if(t.gurus&&Array.isArray(t.gurus)&&t.gurus.length>0&&t.gurus.forEach((m,F)=>{if(m&&m.guru_id&&m.gaji){const w=`${m.guru_id}: Rp ${h(m.gaji).toLocaleString()}`;l.pengeluaran.gajiDetail.includes(w)||(l.pengeluaran.gajiDetail.push(w),r=!0)}}),!r&&t.gaji&&h(t.gaji)>0){let m="Private";t.user&&t.user.name&&(m=t.user.name);const F=`${m}: Rp ${h(t.gaji).toLocaleString()}`;l.pengeluaran.gajiDetail.includes(F)||(l.pengeluaran.gajiDetail.push(F),r=!0)}!r&&t.private_bimbles&&Array.isArray(t.private_bimbles)&&t.private_bimbles.length>0&&t.private_bimbles.forEach(m=>{if(m.pivot&&m.pivot.gaji){const w=`${m.nama||"Private"}: Rp ${h(m.pivot.gaji).toLocaleString()}`;l.pengeluaran.gajiDetail.includes(w)||(l.pengeluaran.gajiDetail.push(w),r=!0)}}),l.pengeluaran.atk+=h(t.atk),l.pengeluaran.sewa+=h(t.sewa),l.pengeluaran.intensif+=h(t.intensif),l.pengeluaran.lisensi+=h(t.lisensi),l.pengeluaran.thr+=h(t.thr),l.pengeluaran.lainlain+=h(t.lainlain),l.pengeluaran.total+=h(t.totalpengeluaran)});const P=Array.from(x.values()).sort((t,o)=>new Date(t.tanggal)-new Date(o.tanggal));let N=0,B=0,q=0,M=0,H=0,_=0,I=0,G=0,Z=0,V=0,U=0,K=0,O=0,z=0,J=0;const s={},e=[];f.forEach(t=>{s[t.id]=0}),P.forEach(t=>{const o=[];o.push(t.hari),o.push(t.tanggal),o.push(t.pemasukan.nama.join(", ")||"N/A"),f.forEach(r=>{const m=t.pemasukan.pakets[r.id]||0;o.push(m),s[r.id]+=m}),o.push(t.pemasukan.totalbiaya||0),o.push(t.pemasukan.daftar||0),o.push(t.pemasukan.modul||0),o.push(t.pemasukan.kaos||0),o.push(t.pemasukan.kas||0),o.push(t.pemasukan.lainlain||0),o.push(t.pemasukan.total||0),o.push(""),o.push(t.pengeluaran.pembuat.join(", ")||"N/A"),o.push(t.pengeluaran.gajiDetail.join(", ")||"N/A"),o.push(t.pengeluaran.atk||0),o.push(t.pengeluaran.sewa||0),o.push(t.pengeluaran.intensif||0),o.push(t.pengeluaran.lisensi||0),o.push(t.pengeluaran.thr||0),o.push(t.pengeluaran.lainlain||0),o.push(t.pengeluaran.total||0);const l=(t.pemasukan.total||0)-(t.pengeluaran.total||0);o.push(l),u.push(o),N+=t.pemasukan.total||0,q+=t.pemasukan.totalbiaya||0,M+=t.pemasukan.daftar||0,H+=t.pemasukan.modul||0,_+=t.pemasukan.kaos||0,I+=t.pemasukan.kas||0,G+=t.pemasukan.lainlain||0,B+=t.pengeluaran.total||0,Z+=t.pengeluaran.atk||0,V+=t.pengeluaran.sewa||0,U+=t.pengeluaran.intensif||0,K+=t.pengeluaran.lisensi||0,O+=t.pengeluaran.thr||0,z+=t.pengeluaran.lainlain||0,t.pengeluaran.gajiDetail.forEach(r=>{const m=r.split(":")[0].trim();if(e.findIndex(w=>w.startsWith(m+":"))===-1){e.push(r);const w=r.match(/Rp ([\d,]+)/);if(w){const gt=parseInt(w[1].replace(/,/g,""));J+=gt}}})});const C=[];for(let t=0;t<y.length;t++)C.push("");u.push(C);const n=[];n.push("TOTAL"),n.push(""),n.push(""),f.forEach(t=>{n.push(s[t.id])}),n.push(q),n.push(M),n.push(H),n.push(_),n.push(I),n.push(G),n.push(N),n.push(""),n.push(""),n.push(`Total Gaji: Rp ${J.toLocaleString()}`),n.push(Z),n.push(V),n.push(U),n.push(K),n.push(O),n.push(z),n.push(B),n.push(N-B),u.push(n);const p=j.aoa_to_sheet(u),W=[{wch:10},{wch:12},{wch:15}];f.forEach(()=>{W.push({wch:15})}),W.push({wch:12},{wch:10},{wch:10},{wch:10},{wch:10},{wch:12},{wch:15},{wch:3},{wch:15},{wch:25},{wch:10},{wch:10},{wch:12},{wch:10},{wch:10},{wch:12},{wch:15},{wch:15}),p["!cols"]=W;const at={font:{bold:!0,size:14},alignment:{horizontal:"center"}},ut={font:{bold:!0},alignment:{horizontal:"center"}},mt={font:{bold:!0}};if(u.length>0&&(p[j.encode_cell({c:0,r:0})]={...p[j.encode_cell({c:0,r:0})],s:at},p[j.encode_cell({c:b,r:0})]={...p[j.encode_cell({c:b,r:0})],s:at}),u.length>1)for(let t=0;t<W.length;t++){const o=j.encode_cell({c:t,r:1});p[o]&&(p[o].s=ut)}const nt=u.length-1;if(nt>=0)for(let t=0;t<W.length;t++){const o=j.encode_cell({c:t,r:nt});p[o]&&(p[o].s=mt)}j.book_append_sheet(T,p,"Rekap Gabungan Private");const rt=`${g}_${$}_${A}.xlsx`;pt(T,rt)},ht=()=>{var M,H,_,I,G,Z,V,U,K,O,z,J;const k=window.open("","_blank"),i=s=>typeof s=="number"?s:parseInt(s,10)||0,L=E||[];let g=`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Laporan Rekap Bulanan Private ${$.toUpperCase()} ${A}</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        margin: 20px; 
                        font-size: 12px;
                    }
                    .header { 
                        text-align: center; 
                        margin-bottom: 30px; 
                    }
                    .section-title { 
                        font-size: 16px; 
                        font-weight: bold; 
                        margin: 20px 0 10px 0; 
                        color: #333;
                        border-bottom: 2px solid #333;
                        padding-bottom: 5px;
                    }
                    table { 
                        width: 100%; 
                        border-collapse: collapse; 
                        margin-bottom: 20px; 
                    }
                    th, td { 
                        border: 1px solid #333; 
                        padding: 8px; 
                        text-align: left; 
                    }
                    th { 
                        background-color: #f5f5f5; 
                        font-weight: bold; 
                    }
                    .total-row { 
                        background-color: #e8f4fd; 
                        font-weight: bold; 
                    }
                    .summary { 
                        display: flex; 
                        justify-content: space-around; 
                        margin: 20px 0; 
                    }
                    .summary-item { 
                        text-align: center; 
                        padding: 15px; 
                        border: 2px solid #333; 
                        border-radius: 8px; 
                        background-color: #f9f9f9; 
                    }
                    .summary-value { 
                        font-size: 18px; 
                        font-weight: bold; 
                        color: #2563eb; 
                    }
                    @media print {
                        body { margin: 0; }
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>LAPORAN REKAP BULANAN PRIVATE</h1>
                    <h2>${$.toUpperCase()} ${A}</h2>
                </div>

                <div class="summary">
                    <div class="summary-item">
                        <div>Total Laba</div>
                        <div class="summary-value">Rp ${et.toLocaleString()}</div>
                    </div>
                    <div class="summary-item">
                        <div>Total Pemasukan</div>
                        <div class="summary-value">Rp ${X.toLocaleString()}</div>
                    </div>
                    <div class="summary-item">
                        <div>Total Pengeluaran</div>
                        <div class="summary-value">Rp ${Y.toLocaleString()}</div>
                    </div>
                    <div class="summary-item">
                        <div>Total Siswa</div>
                        <div class="summary-value">${lt}</div>
                    </div>
                </div>

                <div class="section-title">LAPORAN PEMASUKAN PRIVATE</div>
                <table>
                    <thead>
                        <tr>
                            <th>Hari</th>
                            <th>Tanggal</th>
                            <th>Pembuat Laporan</th>`;L.forEach(s=>{g+=`<th>${s.nama_paket}<br>(Rp ${s.harga.toLocaleString()})</th>`}),g+=`
                            <th>Total Biaya</th>
                            <th>Daftar</th>
                            <th>Modul</th>
                            <th>Kaos</th>
                            <th>Kas</th>
                            <th>Lain-lain</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>`;let T=0;const h={};L.forEach(s=>{h[s.id]=0}),c&&c.data&&c.data.forEach(s=>{var e;g+=`
                    <tr>
                        <td>${s.hari}</td>
                        <td>${s.tanggal}</td>
                        <td>${((e=s.user)==null?void 0:e.name)||"N/A"}</td>`,L.forEach(C=>{const n=s.pakets&&s.pakets[C.id]?parseInt(s.pakets[C.id]):0;h[C.id]+=n,g+=`<td>${n}</td>`}),g+=`
                        <td>Rp ${i(s.totalbiaya).toLocaleString()}</td>
                        <td>Rp ${i(s.daftar).toLocaleString()}</td>
                        <td>Rp ${i(s.modul).toLocaleString()}</td>
                        <td>Rp ${i(s.kaos).toLocaleString()}</td>
                        <td>Rp ${i(s.kas).toLocaleString()}</td>
                        <td>Rp ${i(s.lainlain).toLocaleString()}</td>
                        <td>Rp ${i(s.totalpemasukan).toLocaleString()}</td>
                    </tr>`,T+=i(s.totalpemasukan)}),g+=`
                <tr class="total-row">
                    <td colspan="3"><strong>TOTAL</strong></td>`,L.forEach(s=>{g+=`<td><strong>${h[s.id]}</strong></td>`});const f=((M=c==null?void 0:c.data)==null?void 0:M.reduce((s,e)=>s+i(e.totalbiaya),0))||0,u=((H=c==null?void 0:c.data)==null?void 0:H.reduce((s,e)=>s+i(e.daftar),0))||0,b=((_=c==null?void 0:c.data)==null?void 0:_.reduce((s,e)=>s+i(e.modul),0))||0,R=((I=c==null?void 0:c.data)==null?void 0:I.reduce((s,e)=>s+i(e.kaos),0))||0,S=((G=c==null?void 0:c.data)==null?void 0:G.reduce((s,e)=>s+i(e.kas),0))||0,v=((Z=c==null?void 0:c.data)==null?void 0:Z.reduce((s,e)=>s+i(e.lainlain),0))||0;g+=`
                    <td><strong>Rp ${f.toLocaleString()}</strong></td>
                    <td><strong>Rp ${u.toLocaleString()}</strong></td>
                    <td><strong>Rp ${b.toLocaleString()}</strong></td>
                    <td><strong>Rp ${R.toLocaleString()}</strong></td>
                    <td><strong>Rp ${S.toLocaleString()}</strong></td>
                    <td><strong>Rp ${v.toLocaleString()}</strong></td>
                    <td><strong>Rp ${X.toLocaleString()}</strong></td>
                </tr>
            </tbody>
        </table>

        <div class="section-title">LAPORAN PENGELUARAN PRIVATE</div>
        <table>
            <thead>
                <tr>
                    <th>Hari</th>
                    <th>Tanggal</th>
                    <th>Pembuat Laporan</th>
                    <th>Detail Gaji Private</th>
                    <th>ATK</th>
                    <th>Sewa</th>
                    <th>Intensif</th>
                    <th>Lisensi</th>
                    <th>THR</th>
                    <th>Lain-lain</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>`,a&&a.data&&a.data.forEach(s=>{var C,n;let e="N/A";s.gurus&&Array.isArray(s.gurus)&&s.gurus.length>0?e=s.gurus.map(p=>`${p.guru_id}: Rp ${(p.gaji||0).toLocaleString()}`).join("<br>"):s.gaji&&i(s.gaji)>0&&(e=`${((C=s.user)==null?void 0:C.name)||"Private"}: Rp ${i(s.gaji).toLocaleString()}`),g+=`
                    <tr>
                        <td>${s.hari}</td>
                        <td>${s.tanggal}</td>
                        <td>${((n=s.user)==null?void 0:n.name)||"N/A"}</td>
                        <td>${e}</td>
                        <td>Rp ${i(s.atk).toLocaleString()}</td>
                        <td>Rp ${i(s.sewa).toLocaleString()}</td>
                        <td>Rp ${i(s.intensif).toLocaleString()}</td>
                        <td>Rp ${i(s.lisensi).toLocaleString()}</td>
                        <td>Rp ${i(s.thr).toLocaleString()}</td>
                        <td>Rp ${i(s.lainlain).toLocaleString()}</td>
                        <td>Rp ${i(s.totalpengeluaran).toLocaleString()}</td>
                    </tr>`});let y=0;a!=null&&a.data&&a.data.forEach(s=>{s.gurus&&Array.isArray(s.gurus)&&s.gurus.length>0?y+=s.gurus.reduce((e,C)=>e+(C.gaji||0),0):s.gaji&&(y+=i(s.gaji))});const D=((V=a==null?void 0:a.data)==null?void 0:V.reduce((s,e)=>s+i(e.atk),0))||0,x=((U=a==null?void 0:a.data)==null?void 0:U.reduce((s,e)=>s+i(e.sewa),0))||0,P=((K=a==null?void 0:a.data)==null?void 0:K.reduce((s,e)=>s+i(e.intensif),0))||0,N=((O=a==null?void 0:a.data)==null?void 0:O.reduce((s,e)=>s+i(e.lisensi),0))||0,B=((z=a==null?void 0:a.data)==null?void 0:z.reduce((s,e)=>s+i(e.thr),0))||0,q=((J=a==null?void 0:a.data)==null?void 0:J.reduce((s,e)=>s+i(e.lainlain),0))||0;g+=`
                <tr class="total-row">
                    <td colspan="3"><strong>TOTAL</strong></td>
                    <td><strong>Total Gaji: Rp ${y.toLocaleString()}</strong></td>
                    <td><strong>Rp ${D.toLocaleString()}</strong></td>
                    <td><strong>Rp ${x.toLocaleString()}</strong></td>
                    <td><strong>Rp ${P.toLocaleString()}</strong></td>
                    <td><strong>Rp ${N.toLocaleString()}</strong></td>
                    <td><strong>Rp ${B.toLocaleString()}</strong></td>
                    <td><strong>Rp ${q.toLocaleString()}</strong></td>
                    <td><strong>Rp ${Y.toLocaleString()}</strong></td>
                </tr>
            </tbody>
        </table>

        <div style="margin-top: 30px; text-align: center; font-size: 14px;">
            <p>Dicetak pada: ${new Date().toLocaleString("id-ID")}</p>
        </div>

        </body>
        </html>`,k.document.write(g),k.document.close(),k.focus(),setTimeout(()=>{k.print()},500)};return d.jsxs(ft,{children:[d.jsxs("div",{className:"grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 pb-10",children:[d.jsx(Q,{title:"Total Laba",total:`Rp ${et.toLocaleString()}`,rate:"",levelUp:!0,children:d.jsxs("svg",{className:"fill-primary dark:fill-white",width:"22",height:"16",viewBox:"0 0 22 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[d.jsx("path",{d:"M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z",fill:""}),d.jsx("path",{d:"M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z",fill:""})]})}),d.jsx(Q,{title:"Total Profit",total:`Rp ${X.toLocaleString()}`,rate:"",levelUp:!0,children:d.jsxs("svg",{className:"fill-primary dark:fill-white",width:"20",height:"22",viewBox:"0 0 20 22",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[d.jsx("path",{d:"M11.7531 16.4312C10.3781 16.4312 9.27808 17.5312 9.27808 18.9062C9.27808 20.2812 10.3781 21.3812 11.7531 21.3812C13.1281 21.3812 14.2281 20.2812 14.2281 18.9062C14.2281 17.5656 13.0937 16.4312 11.7531 16.4312ZM11.7531 19.8687C11.2375 19.8687 10.825 19.4562 10.825 18.9406C10.825 18.425 11.2375 18.0125 11.7531 18.0125C12.2687 18.0125 12.6812 18.425 12.6812 18.9406C12.6812 19.4219 12.2343 19.8687 11.7531 19.8687Z",fill:""}),d.jsx("path",{d:"M5.22183 16.4312C3.84683 16.4312 2.74683 17.5312 2.74683 18.9062C2.74683 20.2812 3.84683 21.3812 5.22183 21.3812C6.59683 21.3812 7.69683 20.2812 7.69683 18.9062C7.69683 17.5656 6.56245 16.4312 5.22183 16.4312ZM5.22183 19.8687C4.7062 19.8687 4.2937 19.4562 4.2937 18.9406C4.2937 18.425 4.7062 18.0125 5.22183 18.0125C5.73745 18.0125 6.14995 18.425 6.14995 18.9406C6.14995 19.4219 5.73745 19.8687 5.22183 19.8687Z",fill:""}),d.jsx("path",{d:"M19.0062 0.618744H17.15C16.325 0.618744 15.6031 1.23749 15.5 2.06249L14.95 6.01562H1.37185C1.0281 6.01562 0.684353 6.18749 0.443728 6.46249C0.237478 6.73749 0.134353 7.11562 0.237478 7.45937C0.237478 7.49374 0.237478 7.49374 0.237478 7.52812L2.36873 13.9562C2.50623 14.4375 2.9531 14.7812 3.46873 14.7812H12.9562C14.2281 14.7812 15.3281 13.8187 15.5 12.5469L16.9437 2.26874C16.9437 2.19999 17.0125 2.16562 17.0812 2.16562H18.9375C19.35 2.16562 19.7281 1.82187 19.7281 1.37499C19.7281 0.928119 19.4187 0.618744 19.0062 0.618744ZM14.0219 12.3062C13.9531 12.8219 13.5062 13.2 12.9906 13.2H3.7781L1.92185 7.56249H14.7094L14.0219 12.3062Z",fill:""})]})}),d.jsx(Q,{title:"Total Outcome",total:`Rp ${Y.toLocaleString()}`,rate:"",levelUp:!0,children:d.jsxs("svg",{className:"fill-primary dark:fill-white",width:"22",height:"22",viewBox:"0 0 22 22",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[d.jsx("path",{d:"M21.1063 18.0469L19.3875 3.23126C19.2157 1.71876 17.9438 0.584381 16.3969 0.584381H5.56878C4.05628 0.584381 2.78441 1.71876 2.57816 3.23126L0.859406 18.0469C0.756281 18.9063 1.03128 19.7313 1.61566 20.3844C2.20003 21.0375 2.99066 21.3813 3.85003 21.3813H18.1157C18.975 21.3813 19.8 21.0031 20.35 20.3844C20.9 19.7656 21.2094 18.9063 21.1063 18.0469ZM19.2157 19.3531C18.9407 19.6625 18.5625 19.8344 18.15 19.8344H3.85003C3.43753 19.8344 3.05941 19.6625 2.78441 19.3531C2.50941 19.0438 2.37191 18.6313 2.44066 18.2188L4.12503 3.43751C4.19378 2.71563 4.81253 2.16563 5.56878 2.16563H16.4313C17.1532 2.16563 17.7719 2.71563 17.875 3.43751L19.5938 18.2531C19.6282 18.6656 19.4907 19.0438 19.2157 19.3531Z",fill:""}),d.jsx("path",{d:"M14.3345 5.29375C13.922 5.39688 13.647 5.80938 13.7501 6.22188C13.7845 6.42813 13.8189 6.63438 13.8189 6.80625C13.8189 8.35313 12.547 9.625 11.0001 9.625C9.45327 9.625 8.1814 8.35313 8.1814 6.80625C8.1814 6.6 8.21577 6.42813 8.25015 6.22188C8.35327 5.80938 8.07827 5.39688 7.66577 5.29375C7.25327 5.19063 6.84077 5.46563 6.73765 5.87813C6.6689 6.1875 6.63452 6.49688 6.63452 6.80625C6.63452 9.2125 8.5939 11.1719 11.0001 11.1719C13.4064 11.1719 15.3658 9.2125 15.3658 6.80625C15.3658 6.49688 15.3314 6.1875 15.2626 5.87813C15.1595 5.46563 14.747 5.225 14.3345 5.29375Z",fill:""})]})}),d.jsx(Q,{title:"Total Students",total:lt,rate:"",levelUp:!0,children:d.jsxs("svg",{className:"fill-primary dark:fill-white",width:"22",height:"18",viewBox:"0 0 22 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[d.jsx("path",{d:"M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z",fill:""}),d.jsx("path",{d:"M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z",fill:""}),d.jsx("path",{d:"M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z",fill:""})]})})]}),d.jsxs("div",{className:"flex justify-center gap-4 mb-6",children:[d.jsxs("button",{onClick:()=>ct(c,a,E,"Rekap_Gabungan_Private"),className:"bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded flex items-center",children:[d.jsx("svg",{className:"w-4 h-4 mr-2",fill:"currentColor",viewBox:"0 0 20 20",children:d.jsx("path",{fillRule:"evenodd",d:"M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",clipRule:"evenodd"})}),"Download Excel Gabungan"]}),d.jsxs("button",{onClick:ht,className:"bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded flex items-center",children:[d.jsx("svg",{className:"w-4 h-4 mr-2",fill:"currentColor",viewBox:"0 0 20 20",children:d.jsx("path",{fillRule:"evenodd",d:"M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z",clipRule:"evenodd"})}),"Print Laporan"]})]}),d.jsx(kt,{laporanPrivate:c,bulan:$,tahun:A,nextMonth:tt,nextYear:st,prevMonth:ot,prevYear:it,paketPrivate:E}),d.jsx(Ct,{laporanPengeluaranPrivate:a,bulan:$,tahun:A,nextMonth:tt,nextYear:st,prevMonth:ot,prevYear:it})]})};export{yt as default};
