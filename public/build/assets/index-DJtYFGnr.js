import{j as a}from"./app-CjOG9aAE.js";import{D as u1}from"./DefaultLayout-C0U3DCg4.js";import{C as Q}from"./CardDataStats-DfIsv5yC.js";import{u as X,w as f1}from"./xlsx-DjuO7_Ju.js";import"./flowbite.min-Dyi2Wf9s.js";import r1 from"./TablePemasukanRekap-13iSdHLs.js";import g1 from"./TablePengeluaranRekap-Cq2-eIVz.js";import"./index-BCBCUD0G.js";import"./sweetalert2.esm.all-5zhdP7Ax.js";import"./index-D-Tugu_n.js";const R1=({laporanMitra:c,laporanPengeluaranMitra:n,bulan:A,tahun:S,nextMonth:M,nextYear:t1,prevMonth:s1,prevYear:e1,paketMitra:E})=>{const o=m=>typeof m=="number"?m:parseInt(m,10)||0,g=m=>o(m).toLocaleString(),i1=(m,C)=>{const $=m&&Array.isArray(m)?m:[],f=C&&Array.isArray(C)?C:[],b=$.reduce((r,u)=>r+o(u==null?void 0:u.totalpemasukan),0),L=f.reduce((r,u)=>r+o(u==null?void 0:u.totalpengeluaran),0),x=b-L,k=$.reduce((r,u)=>!u||!u.pakets||!Array.isArray(u.pakets)?r:r+u.pakets.reduce((R,w)=>{var T;return R+o((T=w==null?void 0:w.pivot)==null?void 0:T.jumlah)},0),0);return{totalLaba:x,totalProfit:b,totalOutcome:L,totalStudents:k}},d1=(c==null?void 0:c.data)||[],a1=(n==null?void 0:n.data)||[],{totalLaba:P,totalProfit:B,totalOutcome:U,totalStudents:o1}=i1(d1,a1),n1=(m,C,$,f)=>{const b=X.book_new(),L=$&&Array.isArray($)?$:[],x=(m==null?void 0:m.data)||[],k=(C==null?void 0:C.data)||[],r=[],u=3+L.length+7+1,R=[`LAPORAN PEMASUKAN BULAN ${(A||"").toString().toUpperCase()} ${S||""}`];for(let t=1;t<u;t++)R.push("");R.push(`LAPORAN PENGELUARAN BULAN ${(A||"").toString().toUpperCase()}`),r.push(R);const w=["Hari","Tanggal","Nama"];L.forEach(t=>{const s=t&&t.harga?o(t.harga).toLocaleString():"0";w.push(`${(t==null?void 0:t.nama_paket)||"N/A"} (${s})`)}),w.push("Total Biaya","Daftar","Modul","Kaos","Kas","Lain Lain","Jumlah","");const T=["Pembuat Laporan","Detail Gaji Mitra","ATK","Sewa","Intensif","Lisensi","THR","Lain Lain","Jumlah","Albri"],H=[...w,...T];r.push(H);const Y=(t,s)=>{var h;if(!t||!t.pakets||!Array.isArray(t.pakets))return 0;const i=t.pakets.find(p=>p&&p.id===s);return i?o((h=i.pivot)==null?void 0:h.jumlah):0},j=new Map;x.forEach(t=>{if(!t||!t.tanggal)return;const s=t.tanggal;j.has(s)||j.set(s,{hari:t.hari||"",tanggal:t.tanggal||"",pemasukan:{nama:[],pakets:{},totalbiaya:0,daftar:0,modul:0,kaos:0,kas:0,lainlain:0,total:0},pengeluaran:{pembuat:[],gajiDetail:[],atk:0,sewa:0,intensif:0,lisensi:0,thr:0,lainlain:0,total:0}});const i=j.get(s);t.user&&t.user.name&&(i.pemasukan.nama.includes(t.user.name)||i.pemasukan.nama.push(t.user.name)),L.forEach(h=>{h&&h.id&&(i.pemasukan.pakets[h.id]||(i.pemasukan.pakets[h.id]=0),i.pemasukan.pakets[h.id]+=Y(t,h.id))}),i.pemasukan.totalbiaya+=o(t.totalbiaya),i.pemasukan.daftar+=o(t.daftar),i.pemasukan.modul+=o(t.modul),i.pemasukan.kaos+=o(t.kaos),i.pemasukan.kas+=o(t.kas),i.pemasukan.lainlain+=o(t.lainlain),i.pemasukan.total+=o(t.totalpemasukan)}),k.forEach(t=>{if(!t||!t.tanggal)return;const s=t.tanggal;j.has(s)||j.set(s,{hari:t.hari||"",tanggal:t.tanggal||"",pemasukan:{nama:[],pakets:{},totalbiaya:0,daftar:0,modul:0,kaos:0,kas:0,lainlain:0,total:0},pengeluaran:{pembuat:[],gajiDetail:[],atk:0,sewa:0,intensif:0,lisensi:0,thr:0,lainlain:0,total:0}});const i=j.get(s);if(t.user&&t.user.name&&(i.pengeluaran.pembuat.includes(t.user.name)||i.pengeluaran.pembuat.push(t.user.name)),t.mitras&&Array.isArray(t.mitras)&&t.mitras.length>0)t.mitras.forEach(h=>{if(h&&h.mitra_nama){const p=`${h.mitra_nama}: Rp ${o(h.gaji).toLocaleString()}`;i.pengeluaran.gajiDetail.includes(p)||i.pengeluaran.gajiDetail.push(p)}});else if(t.gaji&&o(t.gaji)>0){const h=`Gaji Mitra: Rp ${o(t.gaji).toLocaleString()}`;i.pengeluaran.gajiDetail.includes(h)||i.pengeluaran.gajiDetail.push(h)}i.pengeluaran.atk+=o(t.atk),i.pengeluaran.sewa+=o(t.sewa),i.pengeluaran.intensif+=o(t.intensif),i.pengeluaran.lisensi+=o(t.lisensi),i.pengeluaran.thr+=o(t.thr),i.pengeluaran.lainlain+=o(t.lainlain),i.pengeluaran.total+=o(t.totalpengeluaran)});const _=Array.from(j.values()).sort((t,s)=>{const i=new Date(t.tanggal),h=new Date(s.tanggal);return i-h});let G=0,K=0;const N={};L.forEach(t=>{t&&t.id&&(N[t.id]=0)}),_.forEach(t=>{const s=[];s.push(t.hari),s.push(t.tanggal),s.push(t.pemasukan.nama.join(", ")||"N/A"),L.forEach(i=>{if(i&&i.id){const h=t.pemasukan.pakets[i.id]||0;s.push(h),N[i.id]+=h}}),s.push(t.pemasukan.totalbiaya),s.push(t.pemasukan.daftar),s.push(t.pemasukan.modul),s.push(t.pemasukan.kaos),s.push(t.pemasukan.kas),s.push(t.pemasukan.lainlain),s.push(t.pemasukan.total),s.push(""),G+=t.pemasukan.total,s.push(t.pengeluaran.pembuat.join(", ")||"N/A"),s.push(t.pengeluaran.gajiDetail.join("; ")||"N/A"),s.push(t.pengeluaran.atk),s.push(t.pengeluaran.sewa),s.push(t.pengeluaran.intensif),s.push(t.pengeluaran.lisensi),s.push(t.pengeluaran.thr),s.push(t.pengeluaran.lainlain),s.push(t.pengeluaran.total),s.push(t.pemasukan.total-t.pengeluaran.total),K+=t.pengeluaran.total,r.push(s)});const l=[];l.push("TOTAL"),l.push(""),l.push(""),L.forEach(t=>{t&&t.id&&l.push(N[t.id]||0)});const I=x.reduce((t,s)=>t+o(s==null?void 0:s.totalbiaya),0),O=x.reduce((t,s)=>t+o(s==null?void 0:s.daftar),0),V=x.reduce((t,s)=>t+o(s==null?void 0:s.modul),0),z=x.reduce((t,s)=>t+o(s==null?void 0:s.kaos),0),D=x.reduce((t,s)=>t+o(s==null?void 0:s.kas),0),e=x.reduce((t,s)=>t+o(s==null?void 0:s.lainlain),0);l.push(I),l.push(O),l.push(V),l.push(z),l.push(D),l.push(e),l.push(B),l.push(""),l.push("");let d=0;k.forEach(t=>{t&&t.mitras&&Array.isArray(t.mitras)&&t.mitras.length>0?d+=t.mitras.reduce((s,i)=>s+o(i==null?void 0:i.gaji),0):d+=o(t==null?void 0:t.gaji)}),l.push(`Total Gaji: Rp ${d.toLocaleString()}`);const v=k.reduce((t,s)=>t+o(s==null?void 0:s.atk),0),y=k.reduce((t,s)=>t+o(s==null?void 0:s.sewa),0),J=k.reduce((t,s)=>t+o(s==null?void 0:s.intensif),0),F=k.reduce((t,s)=>t+o(s==null?void 0:s.lisensi),0),W=k.reduce((t,s)=>t+o(s==null?void 0:s.thr),0),q=k.reduce((t,s)=>t+o(s==null?void 0:s.lainlain),0);l.push(v),l.push(y),l.push(J),l.push(F),l.push(W),l.push(q),l.push(U),l.push(P),r.push(l);const Z=X.aoa_to_sheet(r),l1=H.map(()=>({width:15}));Z["!cols"]=l1;const h1=r.length-1;for(let t=0;t<H.length;t++){const s=X.encode_cell({r:h1,c:t});Z[s]||(Z[s]={}),Z[s].s={font:{bold:!0}}}X.book_append_sheet(b,Z,"Rekap Gabungan Mitra");const m1=`Rekap_Gabungan_Mitra_${f}.xlsx`;f1(b,m1)},c1=()=>{var _,G,K,N,l,I,O,V,z,D;const m=window.open("","_blank"),C=E&&Array.isArray(E)?E:[],$=(c==null?void 0:c.data)||[];n!=null&&n.data;let f=`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Laporan Rekap Bulanan Mitra ${(A||"").toString().toUpperCase()} ${S||""}</title>
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
                    <h1>LAPORAN REKAP BULANAN MITRA</h1>
                    <h2>${(A||"").toString().toUpperCase()} ${S||""}</h2>
                </div>

                <div class="summary">
                    <div class="summary-item">
                        <div>Total Laba</div>
                        <div class="summary-value">Rp ${g(P)}</div>
                    </div>
                    <div class="summary-item">
                        <div>Total Pemasukan</div>
                        <div class="summary-value">Rp ${g(B)}</div>
                    </div>
                    <div class="summary-item">
                        <div>Total Pengeluaran</div>
                        <div class="summary-value">Rp ${g(U)}</div>
                    </div>
                    <div class="summary-item">
                        <div>Total Siswa</div>
                        <div class="summary-value">${o1}</div>
                    </div>
                </div>

                <div class="section-title">LAPORAN PEMASUKAN MITRA</div>
                <table>
                    <thead>
                        <tr>
                            <th>Hari</th>
                            <th>Tanggal</th>
                            <th>Pembuat Laporan</th>`;C.forEach(e=>{const d=e&&e.harga?o(e.harga).toLocaleString():"0";f+=`<th>${(e==null?void 0:e.nama_paket)||"N/A"}<br>(Rp ${d})</th>`}),f+=`
                            <th>Total Biaya</th>
                            <th>Daftar</th>
                            <th>Modul</th>
                            <th>Kaos</th>
                            <th>Kas</th>
                            <th>Lain-lain</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>`;const b={};C.forEach(e=>{e&&e.id&&(b[e.id]=0)}),$.forEach(e=>{var d;e&&(f+=`
                <tr>
                    <td>${e.hari||""}</td>
                    <td>${e.tanggal||""}</td>
                    <td>${((d=e.user)==null?void 0:d.name)||"N/A"}</td>`,C.forEach(v=>{var y,J,F;if(v&&v.id){const W=((F=(J=(y=e.pakets)==null?void 0:y.find(q=>q&&q.id===v.id))==null?void 0:J.pivot)==null?void 0:F.jumlah)||0;b[v.id]+=o(W),f+=`<td>${W}</td>`}}),f+=`
                    <td>Rp ${g(e.totalbiaya)}</td>
                    <td>Rp ${g(e.daftar)}</td>
                    <td>Rp ${g(e.modul)}</td>
                    <td>Rp ${g(e.kaos)}</td>
                    <td>Rp ${g(e.kas)}</td>
                    <td>Rp ${g(e.lainlain)}</td>
                    <td>Rp ${g(e.totalpemasukan)}</td>
                </tr>`)}),f+=`
                <tr class="total-row">
                    <td colspan="3"><strong>TOTAL</strong></td>`,C.forEach(e=>{f+=`<td><strong>${b[e.id]}</strong></td>`});const L=((_=c==null?void 0:c.data)==null?void 0:_.reduce((e,d)=>e+o(d.totalbiaya),0))||0,x=((G=c==null?void 0:c.data)==null?void 0:G.reduce((e,d)=>e+o(d.daftar),0))||0,k=((K=c==null?void 0:c.data)==null?void 0:K.reduce((e,d)=>e+o(d.modul),0))||0,r=((N=c==null?void 0:c.data)==null?void 0:N.reduce((e,d)=>e+o(d.kaos),0))||0,u=((l=c==null?void 0:c.data)==null?void 0:l.reduce((e,d)=>e+o(d.kas),0))||0,R=((I=c==null?void 0:c.data)==null?void 0:I.reduce((e,d)=>e+o(d.lainlain),0))||0;f+=`
                    <td><strong>Rp ${L.toLocaleString()}</strong></td>
                    <td><strong>Rp ${x.toLocaleString()}</strong></td>
                    <td><strong>Rp ${k.toLocaleString()}</strong></td>
                    <td><strong>Rp ${r.toLocaleString()}</strong></td>
                    <td><strong>Rp ${u.toLocaleString()}</strong></td>
                    <td><strong>Rp ${R.toLocaleString()}</strong></td>
                    <td><strong>Rp ${B.toLocaleString()}</strong></td>
                </tr>
            </tbody>
        </table>

        <div class="section-title">LAPORAN PENGELUARAN MITRA</div>
        <table>
            <thead>
                <tr>
                    <th>Hari</th>
                    <th>Tanggal</th>
                    <th>Pembuat Laporan</th>
                    <th>Detail Gaji Mitra</th>
                    <th>ATK</th>
                    <th>Intensif</th>
                    <th>Lisensi</th>
                    <th>Lain-lain</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>`,n&&n.data&&n.data.forEach(e=>{var v;const d=e.mitras&&e.mitras.length>0?e.mitras.map(y=>`${y.mitra_nama}: Rp ${(y.gaji||0).toLocaleString()}`).join("<br>"):"N/A";f+=`
                    <tr>
                        <td>${e.hari}</td>
                        <td>${e.tanggal}</td>
                        <td>${((v=e.user)==null?void 0:v.name)||"N/A"}</td>
                        <td>${d}</td>
                        <td>Rp ${o(e.atk).toLocaleString()}</td>
                        <td>Rp ${o(e.intensif).toLocaleString()}</td>
                        <td>Rp ${o(e.lisensi).toLocaleString()}</td>
                        <td>Rp ${o(e.lainlain).toLocaleString()}</td>
                        <td>Rp ${o(e.totalpengeluaran).toLocaleString()}</td>
                    </tr>`});let w=0;n!=null&&n.data&&n.data.forEach(e=>{e.mitras&&e.mitras.length>0&&(w+=e.mitras.reduce((d,v)=>d+(v.gaji||0),0))});const T=((O=n==null?void 0:n.data)==null?void 0:O.reduce((e,d)=>e+o(d.atk),0))||0,H=((V=n==null?void 0:n.data)==null?void 0:V.reduce((e,d)=>e+o(d.intensif),0))||0,Y=((z=n==null?void 0:n.data)==null?void 0:z.reduce((e,d)=>e+o(d.lisensi),0))||0,j=((D=n==null?void 0:n.data)==null?void 0:D.reduce((e,d)=>e+o(d.lainlain),0))||0;f+=`
                <tr class="total-row">
                    <td colspan="3"><strong>TOTAL</strong></td>
                    <td><strong>Total Gaji: Rp ${w.toLocaleString()}</strong></td>
                    <td><strong>Rp ${T.toLocaleString()}</strong></td>
                    <td><strong>Rp ${H.toLocaleString()}</strong></td>
                    <td><strong>Rp ${Y.toLocaleString()}</strong></td>
                    <td><strong>Rp ${j.toLocaleString()}</strong></td>
                    <td><strong>Rp ${U.toLocaleString()}</strong></td>
                </tr>
            </tbody>
        </table>

        <div style="margin-top: 30px; text-align: center; font-size: 14px;">
            <p>Dicetak pada: ${new Date().toLocaleString("id-ID")}</p>
        </div>

        </body>
        </html>`,m.document.write(f),m.document.close(),m.focus(),setTimeout(()=>{m.print()},500)};return a.jsxs(u1,{children:[a.jsxs("div",{className:"grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 pb-10",children:[a.jsx(Q,{title:"Total Laba",total:`Rp ${g(P)}`,rate:"",levelUp:!0,children:a.jsxs("svg",{className:"fill-primary dark:fill-white",width:"22",height:"16",viewBox:"0 0 22 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[a.jsx("path",{d:"M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z",fill:""}),a.jsx("path",{d:"M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z",fill:""})]})}),a.jsx(Q,{title:"Total Profit",total:`Rp ${g(B)}`,rate:"",levelUp:!0,children:a.jsxs("svg",{className:"fill-primary dark:fill-white",width:"20",height:"22",viewBox:"0 0 20 22",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[a.jsx("path",{d:"M11.7531 16.4312C10.3781 16.4312 9.27808 17.5312 9.27808 18.9062C9.27808 20.2812 10.3781 21.3812 11.7531 21.3812C13.1281 21.3812 14.2281 20.2812 14.2281 18.9062C14.2281 17.5656 13.0937 16.4312 11.7531 16.4312ZM11.7531 19.8687C11.2375 19.8687 10.825 19.4562 10.825 18.9406C10.825 18.425 11.2375 18.0125 11.7531 18.0125C12.2687 18.0125 12.6812 18.425 12.6812 18.9406C12.6812 19.4219 12.2343 19.8687 11.7531 19.8687Z",fill:""}),a.jsx("path",{d:"M5.22183 16.4312C3.84683 16.4312 2.74683 17.5312 2.74683 18.9062C2.74683 20.2812 3.84683 21.3812 5.22183 21.3812C6.59683 21.3812 7.69683 20.2812 7.69683 18.9062C7.69683 17.5656 6.56245 16.4312 5.22183 16.4312ZM5.22183 19.8687C4.7062 19.8687 4.2937 19.4562 4.2937 18.9406C4.2937 18.425 4.7062 18.0125 5.22183 18.0125C5.73745 18.0125 6.14995 18.425 6.14995 18.9406C6.14995 19.4219 5.73745 19.8687 5.22183 19.8687Z",fill:""}),a.jsx("path",{d:"M19.0062 0.618744H17.15C16.325 0.618744 15.6031 1.23749 15.5 2.06249L14.95 6.01562H1.37185C1.0281 6.01562 0.684353 6.18749 0.443728 6.46249C0.237478 6.73749 0.134353 7.11562 0.237478 7.45937C0.237478 7.49374 0.237478 7.49374 0.237478 7.52812L2.36873 13.9562C2.50623 14.4375 2.9531 14.7812 3.46873 14.7812H12.9562C14.2281 14.7812 15.3281 13.8187 15.5 12.5469L16.9437 2.26874C16.9437 2.19999 17.0125 2.16562 17.0812 2.16562H18.9375C19.35 2.16562 19.7281 1.82187 19.7281 1.37499C19.7281 0.928119 19.4187 0.618744 19.0062 0.618744ZM14.0219 12.3062C13.9531 12.8219 13.5062 13.2 12.9906 13.2H3.7781L1.92185 7.56249H14.7094L14.0219 12.3062Z",fill:""})]})}),a.jsx(Q,{title:"Total Outcome",total:`Rp ${g(U)}`,rate:"",levelUp:!0,children:a.jsxs("svg",{className:"fill-primary dark:fill-white",width:"22",height:"22",viewBox:"0 0 22 22",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[a.jsx("path",{d:"M21.1063 18.0469L19.3875 3.23126C19.2157 1.71876 17.9438 0.584381 16.3969 0.584381H5.56878C4.05628 0.584381 2.78441 1.71876 2.57816 3.23126L0.859406 18.0469C0.756281 18.9063 1.03128 19.7313 1.61566 20.3844C2.20003 21.0375 2.99066 21.3813 3.85003 21.3813H18.1157C18.975 21.3813 19.8 21.0031 20.35 20.3844C20.9 19.7656 21.2094 18.9063 21.1063 18.0469ZM19.2157 19.3531C18.9407 19.6625 18.5625 19.8344 18.15 19.8344H3.85003C3.43753 19.8344 3.05941 19.6625 2.78441 19.3531C2.50941 19.0438 2.37191 18.6313 2.44066 18.2188L4.12503 3.43751C4.19378 2.71563 4.81253 2.16563 5.56878 2.16563H16.4313C17.1532 2.16563 17.7719 2.71563 17.875 3.43751L19.5938 18.2531C19.6282 18.6656 19.4907 19.0438 19.2157 19.3531Z",fill:""}),a.jsx("path",{d:"M14.3345 5.29375C13.922 5.39688 13.647 5.80938 13.7501 6.22188C13.7845 6.42813 13.8189 6.63438 13.8189 6.80625C13.8189 8.35313 12.547 9.625 11.0001 9.625C9.45327 9.625 8.1814 8.35313 8.1814 6.80625C8.1814 6.6 8.21577 6.42813 8.25015 6.22188C8.35327 5.80938 8.07827 5.39688 7.66577 5.29375C7.25327 5.19063 6.84077 5.46563 6.73765 5.87813C6.6689 6.1875 6.63452 6.49688 6.63452 6.80625C6.63452 9.2125 8.5939 11.1719 11.0001 11.1719C13.4064 11.1719 15.3658 9.2125 15.3658 6.80625C15.3658 6.49688 15.3314 6.1875 15.2626 5.87813C15.1595 5.46563 14.747 5.225 14.3345 5.29375Z",fill:""})]})}),a.jsx(Q,{title:"Total Students",total:o1,rate:"",levelUp:!0,children:a.jsxs("svg",{className:"fill-primary dark:fill-white",width:"22",height:"18",viewBox:"0 0 22 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[a.jsx("path",{d:"M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z",fill:""}),a.jsx("path",{d:"M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z",fill:""}),a.jsx("path",{d:"M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z",fill:""})]})})]}),a.jsxs("div",{className:"flex justify-center gap-4 mb-6",children:[a.jsxs("button",{onClick:()=>n1(c,n,E,`${A}_${S}`),className:"bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded flex items-center",children:[a.jsx("svg",{className:"w-4 h-4 mr-2",fill:"currentColor",viewBox:"0 0 20 20",children:a.jsx("path",{fillRule:"evenodd",d:"M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",clipRule:"evenodd"})}),"Download Excel Gabungan"]}),a.jsxs("button",{onClick:c1,className:"bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded flex items-center",children:[a.jsx("svg",{className:"w-4 h-4 mr-2",fill:"currentColor",viewBox:"0 0 20 20",children:a.jsx("path",{fillRule:"evenodd",d:"M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z",clipRule:"evenodd"})}),"Print Laporan"]})]}),a.jsx(r1,{laporanMitra:c,bulan:A,tahun:S,nextMonth:M,nextYear:t1,prevMonth:s1,prevYear:e1,paketMitra:E}),a.jsx(g1,{laporanPengeluaranMitra:n,bulan:A,tahun:S,nextMonth:M,nextYear:t1,prevMonth:s1,prevYear:e1})]})};export{R1 as default};
