import{j as n}from"./app-BwK3AApH.js";import{D as ft}from"./DefaultLayout-CBQaxZIM.js";import{C as Q}from"./CardDataStats-DJIKa9MH.js";import{u as N,w as pt}from"./xlsx-DjuO7_Ju.js";import"./flowbite.min-Dyi2Wf9s.js";import"./index-D6b0ya7t.js";import bt from"./RekapPemasukan-jvkv0jM8.js";import kt from"./RekapPengeluaran-CxKq3l5c.js";import"./sweetalert2.esm.all-5zhdP7Ax.js";import"./index-mn58H4xD.js";const Tt=({laporanPrivate:d,laporanPengeluaranPrivate:l,bulan:R,tahun:S,nextMonth:tt,nextYear:st,prevMonth:et,prevYear:ot,paketPrivate:y})=>{const dt=(f,p)=>{Array.isArray(f)||(f=[]),Array.isArray(p)||(p=[]);const w=f.reduce((r,u)=>r+(Number(u.totalpemasukan)||0),0),m=p.reduce((r,u)=>r+(Number(u.totalpengeluaran)||0),0),A=w-m,k=f.reduce((r,u)=>{if(!y||!u.pakets)return r;let x=0;return y.forEach(j=>{const $=u.pakets[j.id]?Number(u.pakets[j.id]):0;x+=$}),r+x},0);return{totalLaba:A,totalProfit:w,totalOutcome:m,totalStudents:k}},{totalLaba:it,totalProfit:X,totalOutcome:Y,totalStudents:lt}=dt((d==null?void 0:d.data)||[],(l==null?void 0:l.data)||[]),ut=(f,p,w,m)=>{const A=N.book_new(),k=t=>typeof t=="number"?t:parseInt(t,10)||0,r=w||[],u=[],x=3+r.length+7+1,j=[`LAPORAN PEMASUKAN BULAN ${R.toUpperCase()} ${S}`];for(let t=1;t<x;t++)j.push("");j.push(`LAPORAN PENGELUARAN BULAN ${R.toUpperCase()}`),u.push(j);const $=["Hari","Tanggal","Nama"];r.forEach(t=>{$.push(`${t.nama_paket} (${t.harga.toLocaleString()})`)}),$.push("Total Biaya","Daftar","Modul","Kaos","Kas","Lain Lain","Jumlah","");const v=["Pembuat Laporan","Detail Gaji Private","ATK","Sewa","Intensif","Lisensi","THR","Lain Lain","Jumlah","Albri"],T=[...$,...v];u.push(T);const D=(t,e)=>t.pakets&&t.pakets[e]?parseInt(t.pakets[e]):0,L=new Map;f&&f.data&&f.data.forEach(t=>{const e=t.tanggal;L.has(e)||L.set(e,{hari:t.hari,tanggal:t.tanggal,pemasukan:{nama:[],pakets:{},totalbiaya:0,daftar:0,modul:0,kaos:0,kas:0,lainlain:0,total:0},pengeluaran:{pembuat:[],gajiDetail:[],atk:0,sewa:0,intensif:0,lisensi:0,thr:0,lainlain:0,total:0}});const i=L.get(e);t.user&&t.user.name&&(i.pemasukan.nama.includes(t.user.name)||i.pemasukan.nama.push(t.user.name)),r.forEach(h=>{i.pemasukan.pakets[h.id]||(i.pemasukan.pakets[h.id]=0),i.pemasukan.pakets[h.id]+=D(t,h.id)}),i.pemasukan.totalbiaya+=Number(t.totalbiaya)||0,i.pemasukan.daftar+=Number(t.daftar)||0,i.pemasukan.modul+=Number(t.modul)||0,i.pemasukan.kaos+=Number(t.kaos)||0,i.pemasukan.kas+=Number(t.kas)||0,i.pemasukan.lainlain+=Number(t.lainlain)||0,i.pemasukan.total+=Number(t.totalpemasukan)||0}),p&&p.data&&p.data.forEach(t=>{const e=t.tanggal;L.has(e)||L.set(e,{hari:t.hari,tanggal:t.tanggal,pemasukan:{nama:[],pakets:{},totalbiaya:0,daftar:0,modul:0,kaos:0,kas:0,lainlain:0,total:0},pengeluaran:{pembuat:[],gajiDetail:[],atk:0,sewa:0,intensif:0,lisensi:0,thr:0,lainlain:0,total:0}});const i=L.get(e);t.user&&t.user.name&&(i.pengeluaran.pembuat.includes(t.user.name)||i.pengeluaran.pembuat.push(t.user.name));let h=!1;if(t.gurus&&Array.isArray(t.gurus)&&t.gurus.length>0&&t.gurus.forEach((c,F)=>{if(c&&c.guru_id&&c.gaji){const C=`${c.guru_id}: Rp ${k(c.gaji).toLocaleString()}`;i.pengeluaran.gajiDetail.includes(C)||(i.pengeluaran.gajiDetail.push(C),h=!0)}}),!h&&t.gaji&&k(t.gaji)>0){let c="Private";t.user&&t.user.name&&(c=t.user.name);const F=`${c}: Rp ${k(t.gaji).toLocaleString()}`;i.pengeluaran.gajiDetail.includes(F)||(i.pengeluaran.gajiDetail.push(F),h=!0)}!h&&t.private_bimbles&&Array.isArray(t.private_bimbles)&&t.private_bimbles.length>0&&t.private_bimbles.forEach(c=>{if(c.pivot&&c.pivot.gaji){const C=`${c.nama||"Private"}: Rp ${k(c.pivot.gaji).toLocaleString()}`;i.pengeluaran.gajiDetail.includes(C)||(i.pengeluaran.gajiDetail.push(C),h=!0)}}),i.pengeluaran.atk+=Number(t.atk)||0,i.pengeluaran.sewa+=Number(t.sewa)||0,i.pengeluaran.intensif+=Number(t.intensif)||0,i.pengeluaran.lisensi+=Number(t.lisensi)||0,i.pengeluaran.thr+=Number(t.thr)||0,i.pengeluaran.lainlain+=Number(t.lainlain)||0,i.pengeluaran.total+=Number(t.totalpengeluaran)||0});const P=Array.from(L.values()).sort((t,e)=>new Date(t.tanggal)-new Date(e.tanggal));let E=0,B=0,q=0,M=0,H=0,_=0,G=0,Z=0,I=0,V=0,U=0,K=0,O=0,z=0,J=0;const s={},o=[];r.forEach(t=>{s[t.id]=0}),P.forEach(t=>{const e=[];e.push(t.hari),e.push(t.tanggal),e.push(t.pemasukan.nama.join(", ")||"N/A"),r.forEach(h=>{const c=t.pemasukan.pakets[h.id]||0;e.push(c),s[h.id]+=c}),e.push(t.pemasukan.totalbiaya||0),e.push(t.pemasukan.daftar||0),e.push(t.pemasukan.modul||0),e.push(t.pemasukan.kaos||0),e.push(t.pemasukan.kas||0),e.push(t.pemasukan.lainlain||0),e.push(t.pemasukan.total||0),e.push(""),e.push(t.pengeluaran.pembuat.join(", ")||"N/A"),e.push(t.pengeluaran.gajiDetail.join(", ")||"N/A"),e.push(t.pengeluaran.atk||0),e.push(t.pengeluaran.sewa||0),e.push(t.pengeluaran.intensif||0),e.push(t.pengeluaran.lisensi||0),e.push(t.pengeluaran.thr||0),e.push(t.pengeluaran.lainlain||0),e.push(t.pengeluaran.total||0);const i=(t.pemasukan.total||0)-(t.pengeluaran.total||0);e.push(i),u.push(e),E+=Number(t.pemasukan.total)||0,q+=Number(t.pemasukan.totalbiaya)||0,M+=Number(t.pemasukan.daftar)||0,H+=Number(t.pemasukan.modul)||0,_+=Number(t.pemasukan.kaos)||0,G+=Number(t.pemasukan.kas)||0,Z+=Number(t.pemasukan.lainlain)||0,B+=Number(t.pengeluaran.total)||0,I+=Number(t.pengeluaran.atk)||0,V+=Number(t.pengeluaran.sewa)||0,U+=Number(t.pengeluaran.intensif)||0,K+=Number(t.pengeluaran.lisensi)||0,O+=Number(t.pengeluaran.thr)||0,z+=Number(t.pengeluaran.lainlain)||0,t.pengeluaran.gajiDetail.forEach(h=>{const c=h.split(":")[0].trim();if(o.findIndex(C=>C.startsWith(c+":"))===-1){o.push(h);const C=h.match(/Rp ([\d,]+)/);if(C){const gt=Number(C[1].replace(/,/g,""));J+=gt}}})});const b=[];for(let t=0;t<T.length;t++)b.push("");u.push(b);const a=[];a.push("TOTAL"),a.push(""),a.push(""),r.forEach(t=>{a.push(s[t.id])}),a.push(q),a.push(M),a.push(H),a.push(_),a.push(G),a.push(Z),a.push(E),a.push(""),a.push(""),a.push(`Total Gaji: Rp ${J.toLocaleString()}`),a.push(I),a.push(V),a.push(U),a.push(K),a.push(O),a.push(z),a.push(B),a.push(E-B),u.push(a);const g=N.aoa_to_sheet(u),W=[{wch:10},{wch:12},{wch:15}];r.forEach(()=>{W.push({wch:15})}),W.push({wch:12},{wch:10},{wch:10},{wch:10},{wch:10},{wch:12},{wch:15},{wch:3},{wch:15},{wch:25},{wch:10},{wch:10},{wch:12},{wch:10},{wch:10},{wch:12},{wch:15},{wch:15}),g["!cols"]=W;const at={font:{bold:!0,size:14},alignment:{horizontal:"center"}},ht={font:{bold:!0},alignment:{horizontal:"center"}},mt={font:{bold:!0}};if(u.length>0&&(g[N.encode_cell({c:0,r:0})]={...g[N.encode_cell({c:0,r:0})],s:at},g[N.encode_cell({c:x,r:0})]={...g[N.encode_cell({c:x,r:0})],s:at}),u.length>1)for(let t=0;t<W.length;t++){const e=N.encode_cell({c:t,r:1});g[e]&&(g[e].s=ht)}const nt=u.length-1;if(nt>=0)for(let t=0;t<W.length;t++){const e=N.encode_cell({c:t,r:nt});g[e]&&(g[e].s=mt)}N.book_append_sheet(A,g,"Rekap Gabungan Private");const rt=`${m}_${R}_${S}.xlsx`;pt(A,rt)},ct=()=>{var M,H,_,G,Z,I,V,U,K,O,z,J;const f=window.open("","_blank"),p=s=>typeof s=="number"?s:parseInt(s,10)||0,w=y||[];let m=`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Laporan Rekap Bulanan Private ${R.toUpperCase()} ${S}</title>
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
                    <h2>${R.toUpperCase()} ${S}</h2>
                </div>

                <div class="summary">
                    <div class="summary-item">
                        <div>Total Laba</div>
                        <div class="summary-value">Rp ${it.toLocaleString()}</div>
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
                            <th>Pembuat Laporan</th>`;w.forEach(s=>{m+=`<th>${s.nama_paket}<br>(Rp ${s.harga.toLocaleString()})</th>`}),m+=`
                            <th>Total Biaya</th>
                            <th>Daftar</th>
                            <th>Modul</th>
                            <th>Kaos</th>
                            <th>Kas</th>
                            <th>Lain-lain</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>`;let A=0;const k={};w.forEach(s=>{k[s.id]=0}),d&&d.data&&d.data.forEach(s=>{var o;m+=`
                    <tr>
                        <td>${s.hari}</td>
                        <td>${s.tanggal}</td>
                        <td>${((o=s.user)==null?void 0:o.name)||"N/A"}</td>`,w.forEach(b=>{const a=s.pakets&&s.pakets[b.id]?parseInt(s.pakets[b.id]):0;k[b.id]+=a,m+=`<td>${a}</td>`}),m+=`
                        <td>Rp ${Number(s.totalbiaya).toLocaleString()}</td>
                        <td>Rp ${Number(s.daftar).toLocaleString()}</td>
                        <td>Rp ${Number(s.modul).toLocaleString()}</td>
                        <td>Rp ${Number(s.kaos).toLocaleString()}</td>
                        <td>Rp ${Number(s.kas).toLocaleString()}</td>
                        <td>Rp ${Number(s.lainlain).toLocaleString()}</td>
                        <td>Rp ${Number(s.totalpemasukan).toLocaleString()}</td>
                    </tr>`,A+=p(s.totalpemasukan)}),m+=`
                <tr class="total-row">
                    <td colspan="3"><strong>TOTAL</strong></td>`,w.forEach(s=>{m+=`<td><strong>${k[s.id]}</strong></td>`});const r=((M=d==null?void 0:d.data)==null?void 0:M.reduce((s,o)=>s+Number(o.totalbiaya),0))||0,u=((H=d==null?void 0:d.data)==null?void 0:H.reduce((s,o)=>s+Number(o.daftar),0))||0,x=((_=d==null?void 0:d.data)==null?void 0:_.reduce((s,o)=>s+Number(o.modul),0))||0,j=((G=d==null?void 0:d.data)==null?void 0:G.reduce((s,o)=>s+Number(o.kaos),0))||0,$=((Z=d==null?void 0:d.data)==null?void 0:Z.reduce((s,o)=>s+Number(o.kas),0))||0,v=((I=d==null?void 0:d.data)==null?void 0:I.reduce((s,o)=>s+Number(o.lainlain),0))||0;m+=`
                    <td><strong>Rp ${r.toLocaleString()}</strong></td>
                    <td><strong>Rp ${u.toLocaleString()}</strong></td>
                    <td><strong>Rp ${x.toLocaleString()}</strong></td>
                    <td><strong>Rp ${j.toLocaleString()}</strong></td>
                    <td><strong>Rp ${$.toLocaleString()}</strong></td>
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
            <tbody>`,l&&l.data&&l.data.forEach(s=>{var b,a;let o="N/A";s.gurus&&Array.isArray(s.gurus)&&s.gurus.length>0?o=s.gurus.map(g=>`${g.guru_id}: Rp ${(g.gaji||0).toLocaleString()}`).join("<br>"):s.gaji&&p(s.gaji)>0&&(o=`${((b=s.user)==null?void 0:b.name)||"Private"}: Rp ${p(s.gaji).toLocaleString()}`),m+=`
                    <tr>
                        <td>${s.hari}</td>
                        <td>${s.tanggal}</td>
                        <td>${((a=s.user)==null?void 0:a.name)||"N/A"}</td>
                        <td>${o}</td>
                        <td>Rp ${Number(s.atk).toLocaleString()}</td>
                        <td>Rp ${Number(s.sewa).toLocaleString()}</td>
                        <td>Rp ${Number(s.intensif).toLocaleString()}</td>
                        <td>Rp ${Number(s.lisensi).toLocaleString()}</td>
                        <td>Rp ${Number(s.thr).toLocaleString()}</td>
                        <td>Rp ${Number(s.lainlain).toLocaleString()}</td>
                        <td>Rp ${Number(s.totalpengeluaran).toLocaleString()}</td>
                    </tr>`});let T=0;l!=null&&l.data&&l.data.forEach(s=>{s.gurus&&Array.isArray(s.gurus)&&s.gurus.length>0?T+=s.gurus.reduce((o,b)=>o+Number(b.gaji),0):s.gaji&&(T+=Number(s.gaji))});const D=((V=l==null?void 0:l.data)==null?void 0:V.reduce((s,o)=>s+Number(o.atk),0))||0,L=((U=l==null?void 0:l.data)==null?void 0:U.reduce((s,o)=>s+Number(o.sewa),0))||0,P=((K=l==null?void 0:l.data)==null?void 0:K.reduce((s,o)=>s+Number(o.intensif),0))||0,E=((O=l==null?void 0:l.data)==null?void 0:O.reduce((s,o)=>s+Number(o.lisensi),0))||0,B=((z=l==null?void 0:l.data)==null?void 0:z.reduce((s,o)=>s+Number(o.thr),0))||0,q=((J=l==null?void 0:l.data)==null?void 0:J.reduce((s,o)=>s+Number(o.lainlain),0))||0;m+=`
                <tr class="total-row">
                    <td colspan="3"><strong>TOTAL</strong></td>
                    <td><strong>Total Gaji: Rp ${T.toLocaleString()}</strong></td>
                    <td><strong>Rp ${D.toLocaleString()}</strong></td>
                    <td><strong>Rp ${L.toLocaleString()}</strong></td>
                    <td><strong>Rp ${P.toLocaleString()}</strong></td>
                    <td><strong>Rp ${E.toLocaleString()}</strong></td>
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
        </html>`,f.document.write(m),f.document.close(),f.focus(),setTimeout(()=>{f.print()},500)};return n.jsxs(ft,{children:[n.jsxs("div",{className:"grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 pb-10",children:[n.jsx(Q,{title:"Total Laba",total:`Rp ${it.toLocaleString()}`,rate:"",levelUp:!0,children:n.jsxs("svg",{className:"fill-primary dark:fill-white",width:"22",height:"16",viewBox:"0 0 22 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[n.jsx("path",{d:"M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z",fill:""}),n.jsx("path",{d:"M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z",fill:""})]})}),n.jsx(Q,{title:"Total Profit",total:`Rp ${X.toLocaleString()}`,rate:"",levelUp:!0,children:n.jsxs("svg",{className:"fill-primary dark:fill-white",width:"20",height:"22",viewBox:"0 0 20 22",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[n.jsx("path",{d:"M11.7531 16.4312C10.3781 16.4312 9.27808 17.5312 9.27808 18.9062C9.27808 20.2812 10.3781 21.3812 11.7531 21.3812C13.1281 21.3812 14.2281 20.2812 14.2281 18.9062C14.2281 17.5656 13.0937 16.4312 11.7531 16.4312ZM11.7531 19.8687C11.2375 19.8687 10.825 19.4562 10.825 18.9406C10.825 18.425 11.2375 18.0125 11.7531 18.0125C12.2687 18.0125 12.6812 18.425 12.6812 18.9406C12.6812 19.4219 12.2343 19.8687 11.7531 19.8687Z",fill:""}),n.jsx("path",{d:"M5.22183 16.4312C3.84683 16.4312 2.74683 17.5312 2.74683 18.9062C2.74683 20.2812 3.84683 21.3812 5.22183 21.3812C6.59683 21.3812 7.69683 20.2812 7.69683 18.9062C7.69683 17.5656 6.56245 16.4312 5.22183 16.4312ZM5.22183 19.8687C4.7062 19.8687 4.2937 19.4562 4.2937 18.9406C4.2937 18.425 4.7062 18.0125 5.22183 18.0125C5.73745 18.0125 6.14995 18.425 6.14995 18.9406C6.14995 19.4219 5.73745 19.8687 5.22183 19.8687Z",fill:""}),n.jsx("path",{d:"M19.0062 0.618744H17.15C16.325 0.618744 15.6031 1.23749 15.5 2.06249L14.95 6.01562H1.37185C1.0281 6.01562 0.684353 6.18749 0.443728 6.46249C0.237478 6.73749 0.134353 7.11562 0.237478 7.45937C0.237478 7.49374 0.237478 7.49374 0.237478 7.52812L2.36873 13.9562C2.50623 14.4375 2.9531 14.7812 3.46873 14.7812H12.9562C14.2281 14.7812 15.3281 13.8187 15.5 12.5469L16.9437 2.26874C16.9437 2.19999 17.0125 2.16562 17.0812 2.16562H18.9375C19.35 2.16562 19.7281 1.82187 19.7281 1.37499C19.7281 0.928119 19.4187 0.618744 19.0062 0.618744ZM14.0219 12.3062C13.9531 12.8219 13.5062 13.2 12.9906 13.2H3.7781L1.92185 7.56249H14.7094L14.0219 12.3062Z",fill:""})]})}),n.jsx(Q,{title:"Total Outcome",total:`Rp ${Y.toLocaleString()}`,rate:"",levelUp:!0,children:n.jsxs("svg",{className:"fill-primary dark:fill-white",width:"22",height:"22",viewBox:"0 0 22 22",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[n.jsx("path",{d:"M21.1063 18.0469L19.3875 3.23126C19.2157 1.71876 17.9438 0.584381 16.3969 0.584381H5.56878C4.05628 0.584381 2.78441 1.71876 2.57816 3.23126L0.859406 18.0469C0.756281 18.9063 1.03128 19.7313 1.61566 20.3844C2.20003 21.0375 2.99066 21.3813 3.85003 21.3813H18.1157C18.975 21.3813 19.8 21.0031 20.35 20.3844C20.9 19.7656 21.2094 18.9063 21.1063 18.0469ZM19.2157 19.3531C18.9407 19.6625 18.5625 19.8344 18.15 19.8344H3.85003C3.43753 19.8344 3.05941 19.6625 2.78441 19.3531C2.50941 19.0438 2.37191 18.6313 2.44066 18.2188L4.12503 3.43751C4.19378 2.71563 4.81253 2.16563 5.56878 2.16563H16.4313C17.1532 2.16563 17.7719 2.71563 17.875 3.43751L19.5938 18.2531C19.6282 18.6656 19.4907 19.0438 19.2157 19.3531Z",fill:""}),n.jsx("path",{d:"M14.3345 5.29375C13.922 5.39688 13.647 5.80938 13.7501 6.22188C13.7845 6.42813 13.8189 6.63438 13.8189 6.80625C13.8189 8.35313 12.547 9.625 11.0001 9.625C9.45327 9.625 8.1814 8.35313 8.1814 6.80625C8.1814 6.6 8.21577 6.42813 8.25015 6.22188C8.35327 5.80938 8.07827 5.39688 7.66577 5.29375C7.25327 5.19063 6.84077 5.46563 6.73765 5.87813C6.6689 6.1875 6.63452 6.49688 6.63452 6.80625C6.63452 9.2125 8.5939 11.1719 11.0001 11.1719C13.4064 11.1719 15.3658 9.2125 15.3658 6.80625C15.3658 6.49688 15.3314 6.1875 15.2626 5.87813C15.1595 5.46563 14.747 5.225 14.3345 5.29375Z",fill:""})]})}),n.jsx(Q,{title:"Total Students",total:lt,rate:"",levelUp:!0,children:n.jsxs("svg",{className:"fill-primary dark:fill-white",width:"22",height:"18",viewBox:"0 0 22 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[n.jsx("path",{d:"M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z",fill:""}),n.jsx("path",{d:"M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z",fill:""}),n.jsx("path",{d:"M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z",fill:""})]})})]}),n.jsxs("div",{className:"flex justify-center gap-4 mb-6",children:[n.jsxs("button",{onClick:()=>ut(d,l,y,"Rekap_Gabungan_Private"),className:"bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded flex items-center",children:[n.jsx("svg",{className:"w-4 h-4 mr-2",fill:"currentColor",viewBox:"0 0 20 20",children:n.jsx("path",{fillRule:"evenodd",d:"M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",clipRule:"evenodd"})}),"Download Excel Gabungan"]}),n.jsxs("button",{onClick:ct,className:"bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded flex items-center",children:[n.jsx("svg",{className:"w-4 h-4 mr-2",fill:"currentColor",viewBox:"0 0 20 20",children:n.jsx("path",{fillRule:"evenodd",d:"M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z",clipRule:"evenodd"})}),"Print Laporan"]})]}),n.jsx(bt,{laporanPrivate:d,bulan:R,tahun:S,nextMonth:tt,nextYear:st,prevMonth:et,prevYear:ot,paketPrivate:y}),n.jsx(kt,{laporanPengeluaranPrivate:l,bulan:R,tahun:S,nextMonth:tt,nextYear:st,prevMonth:et,prevYear:ot})]})};export{Tt as default};
