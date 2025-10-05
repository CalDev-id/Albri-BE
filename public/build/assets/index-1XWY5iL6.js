import{q as ct,j as r}from"./app-CDoVCI0C.js";import{D as mt}from"./DefaultLayout-B_kKlB5T.js";import{C as _}from"./CardDataStats-yQ9mBhG3.js";import{u as K,w as gt}from"./xlsx-DjuO7_Ju.js";import"./flowbite.min-Dyi2Wf9s.js";import ft from"./TablePemasukanRekap-CmfFMNjK.js";import pt from"./TablePengeluaranRekap-B0iBC8P_.js";import"./index-DGlSFbZT.js";import"./sweetalert2.esm.all-5zhdP7Ax.js";import"./index-CsnNzEpE.js";const Rt=()=>{const{laporanCabang:$,laporanPengeluaranCabang:A,pakets:T,bulan:L,tahun:N,nextMonth:Y,nextYear:D,prevMonth:q,prevYear:F}=ct().props,n=u=>typeof u=="number"?u:parseInt(u,10)||0,o=u=>n(u).toLocaleString(),Q=(u,g)=>{const c=u&&Array.isArray(u)?u:[],f=g&&Array.isArray(g)?g:[],l=c.reduce((h,C)=>h+n(C.totalpemasukan),0),m=f.reduce((h,C)=>h+n(C.totalpengeluaran),0),k=l-m,p=c.reduce((h,C)=>!C.pakets||!Array.isArray(C.pakets)?h:h+C.pakets.reduce((R,y)=>{var j;return R+n((j=y.pivot)==null?void 0:j.jumlah)},0),0);return{totalLaba:k,totalProfit:l,totalOutcome:m,totalStudents:p}},X=($==null?void 0:$.data)||[],tt=(A==null?void 0:A.data)||[],{totalLaba:O,totalProfit:S,totalOutcome:Z,totalStudents:W}=Q(X,tt),at=(u,g,c,f)=>{const l=K.book_new(),m=c&&Array.isArray(c)?c:[],k=(u==null?void 0:u.data)||[],p=(g==null?void 0:g.data)||[],h=[],C=4+m.length+7+1,R=[`LAPORAN PEMASUKAN BULAN ${(L||"").toString().toUpperCase()} ${N||""}`];for(let t=1;t<C;t++)R.push("");R.push(`LAPORAN PENGELUARAN BULAN ${(L||"").toString().toUpperCase()}`),h.push(R);const y=["Hari","Tanggal","Nama","Cabang"];m.forEach(t=>{const e=t&&t.harga?n(t.harga).toLocaleString():"0";y.push(`${(t==null?void 0:t.nama_paket)||"N/A"} (${e})`)}),y.push("Total Biaya","Daftar","Modul","Kaos","Kas","Lain Lain","Jumlah","");const j=["Pembuat Laporan","Cabang","Detail Gaji Guru","ATK","Sewa","Intensif","Lisensi","THR","Lain Lain","Jumlah","Albri"],M=[...y,...j];h.push(M);const V=(t,e)=>{var d;if(!t||!t.pakets||!Array.isArray(t.pakets))return 0;const i=t.pakets.find(H=>H&&H.id===e);return i?n((d=i.pivot)==null?void 0:d.jumlah):0},v=new Map;k.forEach(t=>{if(!t||!t.tanggal)return;const e=t.tanggal;v.has(e)||v.set(e,{hari:t.hari||"",tanggal:t.tanggal||"",pemasukan:{nama:[],cabang:[],pakets:{},totalbiaya:0,daftar:0,modul:0,kaos:0,kas:0,lainlain:0,total:0},pengeluaran:{pembuat:[],cabang:[],gajiDetail:[],atk:0,sewa:0,intensif:0,lisensi:0,thr:0,lainlain:0,total:0}});const i=v.get(e);t.user&&t.user.name&&(i.pemasukan.nama.includes(t.user.name)||i.pemasukan.nama.push(t.user.name)),t.cabang&&t.cabang.nama&&(i.pemasukan.cabang.includes(t.cabang.nama)||i.pemasukan.cabang.push(t.cabang.nama)),m.forEach(d=>{d&&d.id&&(i.pemasukan.pakets[d.id]||(i.pemasukan.pakets[d.id]=0),i.pemasukan.pakets[d.id]+=V(t,d.id))}),i.pemasukan.totalbiaya+=n(t.totalbiaya),i.pemasukan.daftar+=n(t.daftar),i.pemasukan.modul+=n(t.modul),i.pemasukan.kaos+=n(t.kaos),i.pemasukan.kas+=n(t.kas),i.pemasukan.lainlain+=n(t.lainlain),i.pemasukan.total+=n(t.totalpemasukan)}),p.forEach(t=>{if(!t||!t.tanggal)return;const e=t.tanggal;v.has(e)||v.set(e,{hari:t.hari||"",tanggal:t.tanggal||"",pemasukan:{nama:[],cabang:[],pakets:{},totalbiaya:0,daftar:0,modul:0,kaos:0,kas:0,lainlain:0,total:0},pengeluaran:{pembuat:[],cabang:[],gajiDetail:[],atk:0,sewa:0,intensif:0,lisensi:0,thr:0,lainlain:0,total:0}});const i=v.get(e);t.user&&t.user.name&&(i.pengeluaran.pembuat.includes(t.user.name)||i.pengeluaran.pembuat.push(t.user.name)),t.cabang&&t.cabang.nama&&(i.pengeluaran.cabang.includes(t.cabang.nama)||i.pengeluaran.cabang.push(t.cabang.nama)),t.gurus&&Array.isArray(t.gurus)&&t.gurus.length>0&&t.gurus.forEach(d=>{if(d&&d.guru_nama){const H=`${d.guru_nama}: Rp ${n(d.gaji).toLocaleString()}`;i.pengeluaran.gajiDetail.includes(H)||i.pengeluaran.gajiDetail.push(H)}}),i.pengeluaran.atk+=n(t.atk),i.pengeluaran.sewa+=n(t.sewa),i.pengeluaran.intensif+=n(t.intensif),i.pengeluaran.lisensi+=n(t.lisensi),i.pengeluaran.thr+=n(t.thr),i.pengeluaran.lainlain+=n(t.lainlain),i.pengeluaran.total+=n(t.totalpengeluaran)});const z=Array.from(v.values()).sort((t,e)=>{const i=new Date(t.tanggal),d=new Date(e.tanggal);return i-d});let I=0,J=0;const s={};m.forEach(t=>{t&&t.id&&(s[t.id]=0)}),z.forEach(t=>{const e=[];e.push(t.hari),e.push(t.tanggal),e.push(t.pemasukan.nama.join(", ")||"N/A"),e.push(t.pemasukan.cabang.join(", ")||"N/A"),m.forEach(i=>{if(i&&i.id){const d=t.pemasukan.pakets[i.id]||0;e.push(d),s[i.id]+=d}}),e.push(t.pemasukan.totalbiaya),e.push(t.pemasukan.daftar),e.push(t.pemasukan.modul),e.push(t.pemasukan.kaos),e.push(t.pemasukan.kas),e.push(t.pemasukan.lainlain),e.push(t.pemasukan.total),e.push(""),I+=t.pemasukan.total,e.push(t.pengeluaran.pembuat.join(", ")||"N/A"),e.push(t.pengeluaran.cabang.join(", ")||"N/A"),e.push(t.pengeluaran.gajiDetail.join("; ")||"N/A"),e.push(t.pengeluaran.atk),e.push(t.pengeluaran.sewa),e.push(t.pengeluaran.intensif),e.push(t.pengeluaran.lisensi),e.push(t.pengeluaran.thr),e.push(t.pengeluaran.lainlain),e.push(t.pengeluaran.total),e.push(t.pemasukan.total-t.pengeluaran.total),J+=t.pengeluaran.total,h.push(e)});const a=[];a.push("TOTAL"),a.push(""),a.push(""),a.push(""),m.forEach(t=>{t&&t.id&&a.push(s[t.id]||0)});const b=k.reduce((t,e)=>t+n(e.totalbiaya),0),w=k.reduce((t,e)=>t+n(e.daftar),0),x=k.reduce((t,e)=>t+n(e.modul),0),B=k.reduce((t,e)=>t+n(e.kaos),0),G=k.reduce((t,e)=>t+n(e.kas),0),U=k.reduce((t,e)=>t+n(e.lainlain),0);a.push(b),a.push(w),a.push(x),a.push(B),a.push(G),a.push(U),a.push(S),a.push(""),a.push(""),a.push("");let P=0;p.forEach(t=>{t.gurus&&Array.isArray(t.gurus)&&t.gurus.length>0?P+=t.gurus.reduce((e,i)=>e+n(i.gaji),0):P+=n(t.gaji)}),a.push(`Total Gaji: Rp ${P.toLocaleString()}`);const et=p.reduce((t,e)=>t+n(e.atk),0),nt=p.reduce((t,e)=>t+n(e.sewa),0),it=p.reduce((t,e)=>t+n(e.intensif),0),ot=p.reduce((t,e)=>t+n(e.lisensi),0),rt=p.reduce((t,e)=>t+n(e.thr),0),lt=p.reduce((t,e)=>t+n(e.lainlain),0);a.push(et),a.push(nt),a.push(it),a.push(ot),a.push(rt),a.push(lt),a.push(Z),a.push(O),h.push(a);const E=K.aoa_to_sheet(h),dt=M.map(()=>({width:15}));E["!cols"]=dt;const ut=h.length-1;for(let t=0;t<M.length;t++){const e=K.encode_cell({r:ut,c:t});E[e]||(E[e]={}),E[e].s={font:{bold:!0}}}K.book_append_sheet(l,E,"Rekap Gabungan");const ht=`Rekap_Gabungan_${f}.xlsx`;gt(l,ht)},st=()=>{const u=window.open("","_blank"),g=T&&Array.isArray(T)?T:[],c=($==null?void 0:$.data)||[],f=(A==null?void 0:A.data)||[];let l=`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Laporan Rekap Bulanan ${(L||"").toString().toUpperCase()} ${N||""}</title>
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
                    <h1>LAPORAN REKAP BULANAN</h1>
                    <h2>${(L||"").toString().toUpperCase()} ${N||""}</h2>
                </div>

                <div class="summary">
                    <div class="summary-item">
                        <div>Total Laba</div>
                        <div class="summary-value">Rp ${o(O)}</div>
                    </div>
                    <div class="summary-item">
                        <div>Total Pemasukan</div>
                        <div class="summary-value">Rp ${o(S)}</div>
                    </div>
                    <div class="summary-item">
                        <div>Total Pengeluaran</div>
                        <div class="summary-value">Rp ${o(Z)}</div>
                    </div>
                    <div class="summary-item">
                        <div>Total Siswa</div>
                        <div class="summary-value">${W}</div>
                    </div>
                </div>`;l+=`
                <div class="section-title">LAPORAN PEMASUKAN</div>
                <table>
                    <thead>
                        <tr>
                            <th>Hari</th>
                            <th>Tanggal</th>
                            <th>Pembuat Laporan</th>
                            <th>Cabang</th>`,g.forEach(s=>{const a=s&&s.harga?n(s.harga).toLocaleString():"0";l+=`<th>${(s==null?void 0:s.nama_paket)||"N/A"}<br>(Rp ${a})</th>`}),l+=`
                            <th>Total Biaya</th>
                            <th>Daftar</th>
                            <th>Modul</th>
                            <th>Kaos</th>
                            <th>Kas</th>
                            <th>Lain-lain</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>`;const m={};g.forEach(s=>{s&&s.id&&(m[s.id]=0)}),c.forEach(s=>{var a,b;s&&(l+=`
                <tr>
                    <td>${s.hari||""}</td>
                    <td>${s.tanggal||""}</td>
                    <td>${((a=s.user)==null?void 0:a.name)||"N/A"}</td>
                    <td>${((b=s.cabang)==null?void 0:b.nama)||"N/A"}</td>`,g.forEach(w=>{var x,B,G;if(w&&w.id){const U=((G=(B=(x=s.pakets)==null?void 0:x.find(P=>P&&P.id===w.id))==null?void 0:B.pivot)==null?void 0:G.jumlah)||0;m[w.id]+=n(U),l+=`<td>${U}</td>`}}),l+=`
                    <td>Rp ${o(s.totalbiaya)}</td>
                    <td>Rp ${o(s.daftar)}</td>
                    <td>Rp ${o(s.modul)}</td>
                    <td>Rp ${o(s.kaos)}</td>
                    <td>Rp ${o(s.kas)}</td>
                    <td>Rp ${o(s.lainlain)}</td>
                    <td>Rp ${o(s.totalpemasukan)}</td>
                </tr>`)}),l+=`
                <tr class="total-row">
                    <td colspan="4"><strong>TOTAL</strong></td>`,g.forEach(s=>{s&&s.id&&(l+=`<td><strong>${m[s.id]||0}</strong></td>`)});const k=c.reduce((s,a)=>s+n(a==null?void 0:a.totalbiaya),0),p=c.reduce((s,a)=>s+n(a==null?void 0:a.daftar),0),h=c.reduce((s,a)=>s+n(a==null?void 0:a.modul),0),C=c.reduce((s,a)=>s+n(a==null?void 0:a.kaos),0),R=c.reduce((s,a)=>s+n(a==null?void 0:a.kas),0),y=c.reduce((s,a)=>s+n(a==null?void 0:a.lainlain),0);l+=`
                    <td><strong>Rp ${o(k)}</strong></td>
                    <td><strong>Rp ${o(p)}</strong></td>
                    <td><strong>Rp ${o(h)}</strong></td>
                    <td><strong>Rp ${o(C)}</strong></td>
                    <td><strong>Rp ${o(R)}</strong></td>
                    <td><strong>Rp ${o(y)}</strong></td>
                    <td><strong>Rp ${o(S)}</strong></td>
                </tr>
            </tbody>
        </table>`,l+=`
        <div class="section-title">LAPORAN PENGELUARAN</div>
        <table>
            <thead>
                <tr>
                    <th>Hari</th>
                    <th>Tanggal</th>
                    <th>Pembuat Laporan</th>
                    <th>Cabang</th>
                    <th>Detail Gaji Guru</th>
                    <th>ATK</th>
                    <th>Sewa</th>
                    <th>Intensif</th>
                    <th>Lisensi</th>
                    <th>THR</th>
                    <th>Lain-lain</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>`,f.forEach(s=>{var b,w;if(!s)return;let a="N/A";s.gurus&&Array.isArray(s.gurus)&&s.gurus.length>0&&(a=s.gurus.filter(x=>x&&x.guru_nama).map(x=>`${x.guru_nama}: Rp ${o(x.gaji)}`).join("<br>")),l+=`
                <tr>
                    <td>${s.hari||""}</td>
                    <td>${s.tanggal||""}</td>
                    <td>${((b=s.user)==null?void 0:b.name)||"N/A"}</td>
                    <td>${((w=s.cabang)==null?void 0:w.nama)||"N/A"}</td>
                    <td>${a}</td>
                    <td>Rp ${o(s.atk)}</td>
                    <td>Rp ${o(s.sewa)}</td>
                    <td>Rp ${o(s.intensif)}</td>
                    <td>Rp ${o(s.lisensi)}</td>
                    <td>Rp ${o(s.thr)}</td>
                    <td>Rp ${o(s.lainlain)}</td>
                    <td>Rp ${o(s.totalpengeluaran)}</td>
                </tr>`});let j=0;f.forEach(s=>{s&&s.gurus&&Array.isArray(s.gurus)&&s.gurus.length>0?j+=s.gurus.reduce((a,b)=>a+n(b==null?void 0:b.gaji),0):j+=n(s==null?void 0:s.gaji)});const M=f.reduce((s,a)=>s+n(a==null?void 0:a.atk),0),V=f.reduce((s,a)=>s+n(a==null?void 0:a.sewa),0),v=f.reduce((s,a)=>s+n(a==null?void 0:a.intensif),0),z=f.reduce((s,a)=>s+n(a==null?void 0:a.lisensi),0),I=f.reduce((s,a)=>s+n(a==null?void 0:a.thr),0),J=f.reduce((s,a)=>s+n(a==null?void 0:a.lainlain),0);l+=`
                <tr class="total-row">
                    <td colspan="4"><strong>TOTAL</strong></td>
                    <td><strong>Total Gaji: Rp ${o(j)}</strong></td>
                    <td><strong>Rp ${o(M)}</strong></td>
                    <td><strong>Rp ${o(V)}</strong></td>
                    <td><strong>Rp ${o(v)}</strong></td>
                    <td><strong>Rp ${o(z)}</strong></td>
                    <td><strong>Rp ${o(I)}</strong></td>
                    <td><strong>Rp ${o(J)}</strong></td>
                    <td><strong>Rp ${o(Z)}</strong></td>
                </tr>
            </tbody>
        </table>

        <div style="margin-top: 30px; text-align: center; font-size: 14px;">
            <p>Dicetak pada: ${new Date().toLocaleString("id-ID")}</p>
        </div>

        </body>
        </html>`,u.document.write(l),u.document.close(),u.focus(),setTimeout(()=>{u.print()},500)};return r.jsxs(mt,{children:[r.jsxs("div",{className:"grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 pb-10",children:[r.jsx(_,{title:"Total Laba",total:`Rp ${o(O)}`,rate:"",levelUp:!0,children:r.jsxs("svg",{className:"fill-primary dark:fill-white",width:"22",height:"16",viewBox:"0 0 22 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[r.jsx("path",{d:"M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z",fill:""}),r.jsx("path",{d:"M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z",fill:""})]})}),r.jsx(_,{title:"Total Profit",total:`Rp ${o(S)}`,rate:"",levelUp:!0,children:r.jsxs("svg",{className:"fill-primary dark:fill-white",width:"20",height:"22",viewBox:"0 0 20 22",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[r.jsx("path",{d:"M11.7531 16.4312C10.3781 16.4312 9.27808 17.5312 9.27808 18.9062C9.27808 20.2812 10.3781 21.3812 11.7531 21.3812C13.1281 21.3812 14.2281 20.2812 14.2281 18.9062C14.2281 17.5656 13.0937 16.4312 11.7531 16.4312ZM11.7531 19.8687C11.2375 19.8687 10.825 19.4562 10.825 18.9406C10.825 18.425 11.2375 18.0125 11.7531 18.0125C12.2687 18.0125 12.6812 18.425 12.6812 18.9406C12.6812 19.4219 12.2343 19.8687 11.7531 19.8687Z",fill:""}),r.jsx("path",{d:"M5.22183 16.4312C3.84683 16.4312 2.74683 17.5312 2.74683 18.9062C2.74683 20.2812 3.84683 21.3812 5.22183 21.3812C6.59683 21.3812 7.69683 20.2812 7.69683 18.9062C7.69683 17.5656 6.56245 16.4312 5.22183 16.4312ZM5.22183 19.8687C4.7062 19.8687 4.2937 19.4562 4.2937 18.9406C4.2937 18.425 4.7062 18.0125 5.22183 18.0125C5.73745 18.0125 6.14995 18.425 6.14995 18.9406C6.14995 19.4219 5.73745 19.8687 5.22183 19.8687Z",fill:""}),r.jsx("path",{d:"M19.0062 0.618744H17.15C16.325 0.618744 15.6031 1.23749 15.5 2.06249L14.95 6.01562H1.37185C1.0281 6.01562 0.684353 6.18749 0.443728 6.46249C0.237478 6.73749 0.134353 7.11562 0.237478 7.45937C0.237478 7.49374 0.237478 7.49374 0.237478 7.52812L2.36873 13.9562C2.50623 14.4375 2.9531 14.7812 3.46873 14.7812H12.9562C14.2281 14.7812 15.3281 13.8187 15.5 12.5469L16.9437 2.26874C16.9437 2.19999 17.0125 2.16562 17.0812 2.16562H18.9375C19.35 2.16562 19.7281 1.82187 19.7281 1.37499C19.7281 0.928119 19.4187 0.618744 19.0062 0.618744ZM14.0219 12.3062C13.9531 12.8219 13.5062 13.2 12.9906 13.2H3.7781L1.92185 7.56249H14.7094L14.0219 12.3062Z",fill:""})]})}),r.jsx(_,{title:"Total Outcome",total:`Rp ${o(Z)}`,rate:"",levelUp:!0,children:r.jsxs("svg",{className:"fill-primary dark:fill-white",width:"22",height:"22",viewBox:"0 0 22 22",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[r.jsx("path",{d:"M21.1063 18.0469L19.3875 3.23126C19.2157 1.71876 17.9438 0.584381 16.3969 0.584381H5.56878C4.05628 0.584381 2.78441 1.71876 2.57816 3.23126L0.859406 18.0469C0.756281 18.9063 1.03128 19.7313 1.61566 20.3844C2.20003 21.0375 2.99066 21.3813 3.85003 21.3813H18.1157C18.975 21.3813 19.8 21.0031 20.35 20.3844C20.9 19.7656 21.2094 18.9063 21.1063 18.0469ZM19.2157 19.3531C18.9407 19.6625 18.5625 19.8344 18.15 19.8344H3.85003C3.43753 19.8344 3.05941 19.6625 2.78441 19.3531C2.50941 19.0438 2.37191 18.6313 2.44066 18.2188L4.12503 3.43751C4.19378 2.71563 4.81253 2.16563 5.56878 2.16563H16.4313C17.1532 2.16563 17.7719 2.71563 17.875 3.43751L19.5938 18.2531C19.6282 18.6656 19.4907 19.0438 19.2157 19.3531Z",fill:""}),r.jsx("path",{d:"M14.3345 5.29375C13.922 5.39688 13.647 5.80938 13.7501 6.22188C13.7845 6.42813 13.8189 6.63438 13.8189 6.80625C13.8189 8.35313 12.547 9.625 11.0001 9.625C9.45327 9.625 8.1814 8.35313 8.1814 6.80625C8.1814 6.6 8.21577 6.42813 8.25015 6.22188C8.35327 5.80938 8.07827 5.39688 7.66577 5.29375C7.25327 5.19063 6.84077 5.46563 6.73765 5.87813C6.6689 6.1875 6.63452 6.49688 6.63452 6.80625C6.63452 9.2125 8.5939 11.1719 11.0001 11.1719C13.4064 11.1719 15.3658 9.2125 15.3658 6.80625C15.3658 6.49688 15.3314 6.1875 15.2626 5.87813C15.1595 5.46563 14.747 5.225 14.3345 5.29375Z",fill:""})]})}),r.jsx(_,{title:"Total Students",total:W,rate:"",levelUp:!0,children:r.jsxs("svg",{className:"fill-primary dark:fill-white",width:"22",height:"18",viewBox:"0 0 22 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[r.jsx("path",{d:"M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z",fill:""}),r.jsx("path",{d:"M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z",fill:""}),r.jsx("path",{d:"M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z",fill:""})]})})]}),r.jsxs("div",{className:"flex justify-center gap-4 mb-6",children:[r.jsxs("button",{onClick:()=>at($,A,T,`${L}_${N}`),className:"bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded flex items-center",children:[r.jsx("svg",{className:"w-4 h-4 mr-2",fill:"currentColor",viewBox:"0 0 20 20",children:r.jsx("path",{fillRule:"evenodd",d:"M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",clipRule:"evenodd"})}),"Download Excel Gabungan"]}),r.jsxs("button",{onClick:st,className:"bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded flex items-center",children:[r.jsx("svg",{className:"w-4 h-4 mr-2",fill:"currentColor",viewBox:"0 0 20 20",children:r.jsx("path",{fillRule:"evenodd",d:"M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z",clipRule:"evenodd"})}),"Print Laporan"]})]}),r.jsx(ft,{laporanCabang:$,pakets:T||[],bulan:L,tahun:N,nextMonth:Y,nextYear:D,prevMonth:q,prevYear:F}),r.jsx(pt,{laporanPengeluaranCabang:A,bulan:L,tahun:N,nextMonth:Y,nextYear:D,prevMonth:q,prevYear:F})]})};export{Rt as default};
