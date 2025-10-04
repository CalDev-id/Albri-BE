import{q as wt,j as a}from"./app-DPBPjsud.js";import{D as vt}from"./DefaultLayout-fsByN9bI.js";import{C as F}from"./CardDataStats-La4-1UVu.js";import{u as W,w as gt}from"./xlsx-DjuO7_Ju.js";import"./flowbite.min-Dyi2Wf9s.js";import $t from"./TablePemasukanRekap-BRSN5cGN.js";import jt from"./TablePengeluaranRekap-JwZf6O4t.js";import"./index-CDcaZBKG.js";import"./sweetalert2.esm.all-5zhdP7Ax.js";import"./index-dX6QUltf.js";const Bt=()=>{const{laporanCabang:r,laporanPengeluaranCabang:h,pakets:b,bulan:v,tahun:R,nextMonth:it,nextYear:et,prevMonth:ot,prevYear:dt}=wt().props,kt=(l,e)=>{Array.isArray(l)||(l=[]),Array.isArray(e)||(e=[]);const L=l.reduce((f,n)=>f+(n.totalpemasukan||0),0),m=e.reduce((f,n)=>f+(n.totalpengeluaran||0),0),S=L-m,d=l.reduce((f,n)=>!n.pakets||!Array.isArray(n.pakets)?f:f+n.pakets.reduce((N,g)=>{var w;return N+(((w=g.pivot)==null?void 0:w.jumlah)||0)},0),0);return{totalLaba:S,totalProfit:L,totalOutcome:m,totalStudents:d}},{totalLaba:Q,totalProfit:H,totalOutcome:Z,totalStudents:ct}=kt((r==null?void 0:r.data)||[],(h==null?void 0:h.data)||[]),Lt=(l,e,L,m)=>{var M,E,Y,lt,ht,at,ut,rt,mt,nt,ft,pt;const S=W.book_new(),d=t=>typeof t=="number"?t:parseInt(t,10)||0,f=L||[],n=[],N=4+f.length+7+1,g=[`LAPORAN PEMASUKAN BULAN ${v.toUpperCase()} ${R}`];for(let t=1;t<N;t++)g.push("");g.push(`LAPORAN PENGELUARAN BULAN ${v.toUpperCase()}`),n.push(g);const w=["Hari","Tanggal","Nama","Cabang"];f.forEach(t=>{w.push(`${t.nama_paket} (${t.harga.toLocaleString()})`)}),w.push("Total Biaya","Daftar","Modul","Kaos","Kas","Lain Lain","Jumlah","");const X=["Pembuat Laporan","Cabang","Detail Gaji Guru","ATK","Sewa","Intensif","Lisensi","THR","Lain Lain","Jumlah","Albri"],A=[...w,...X];n.push(A);const D=(t,i)=>{var k;if(!t.pakets)return 0;const o=t.pakets.find(q=>q.id===i);return o?d((k=o.pivot)==null?void 0:k.jumlah):0},x=new Map;l&&l.data&&l.data.forEach(t=>{const i=t.tanggal;x.has(i)||x.set(i,{hari:t.hari,tanggal:t.tanggal,pemasukan:{nama:[],cabang:[],pakets:{},totalbiaya:0,daftar:0,modul:0,kaos:0,kas:0,lainlain:0,total:0},pengeluaran:{pembuat:[],cabang:[],gajiDetail:[],atk:0,sewa:0,intensif:0,lisensi:0,thr:0,lainlain:0,total:0}});const o=x.get(i);t.user&&t.user.name&&(o.pemasukan.nama.includes(t.user.name)||o.pemasukan.nama.push(t.user.name)),t.cabang&&t.cabang.nama&&(o.pemasukan.cabang.includes(t.cabang.nama)||o.pemasukan.cabang.push(t.cabang.nama)),f.forEach(k=>{o.pemasukan.pakets[k.id]||(o.pemasukan.pakets[k.id]=0),o.pemasukan.pakets[k.id]+=D(t,k.id)}),o.pemasukan.totalbiaya+=d(t.totalbiaya),o.pemasukan.daftar+=d(t.daftar),o.pemasukan.modul+=d(t.modul),o.pemasukan.kaos+=d(t.kaos),o.pemasukan.kas+=d(t.kas),o.pemasukan.lainlain+=d(t.lainlain),o.pemasukan.total+=d(t.totalpemasukan)}),e&&e.data&&e.data.forEach(t=>{const i=t.tanggal;x.has(i)||x.set(i,{hari:t.hari,tanggal:t.tanggal,pemasukan:{nama:[],cabang:[],pakets:{},totalbiaya:0,daftar:0,modul:0,kaos:0,kas:0,lainlain:0,total:0},pengeluaran:{pembuat:[],cabang:[],gajiDetail:[],atk:0,sewa:0,intensif:0,lisensi:0,thr:0,lainlain:0,total:0}});const o=x.get(i);t.user&&t.user.name&&(o.pengeluaran.pembuat.includes(t.user.name)||o.pengeluaran.pembuat.push(t.user.name)),t.cabang&&t.cabang.nama&&(o.pengeluaran.cabang.includes(t.cabang.nama)||o.pengeluaran.cabang.push(t.cabang.nama)),t.gurus&&t.gurus.length>0&&t.gurus.forEach(k=>{const q=`${k.guru_nama}: Rp ${(k.gaji||0).toLocaleString()}`;o.pengeluaran.gajiDetail.includes(q)||o.pengeluaran.gajiDetail.push(q)}),o.pengeluaran.atk+=d(t.atk),o.pengeluaran.sewa+=d(t.sewa),o.pengeluaran.intensif+=d(t.intensif),o.pengeluaran.lisensi+=d(t.lisensi),o.pengeluaran.thr+=d(t.thr),o.pengeluaran.lainlain+=d(t.lainlain),o.pengeluaran.total+=d(t.totalpengeluaran)});const P=Array.from(x.values()).sort((t,i)=>new Date(t.tanggal)-new Date(i.tanggal));let tt=0,st=0;const T={};f.forEach(t=>{T[t.id]=0}),P.forEach(t=>{const i=[];i.push(t.hari),i.push(t.tanggal),i.push(t.pemasukan.nama.join(", ")||"N/A"),i.push(t.pemasukan.cabang.join(", ")||"N/A"),f.forEach(o=>{const k=t.pemasukan.pakets[o.id]||0;i.push(k),T[o.id]+=k}),i.push(t.pemasukan.totalbiaya),i.push(t.pemasukan.daftar),i.push(t.pemasukan.modul),i.push(t.pemasukan.kaos),i.push(t.pemasukan.kas),i.push(t.pemasukan.lainlain),i.push(t.pemasukan.total),i.push(""),tt+=t.pemasukan.total,i.push(t.pengeluaran.pembuat.join(", ")||"N/A"),i.push(t.pengeluaran.cabang.join(", ")||"N/A"),i.push(t.pengeluaran.gajiDetail.join("; ")||"N/A"),i.push(t.pengeluaran.atk),i.push(t.pengeluaran.sewa),i.push(t.pengeluaran.intensif),i.push(t.pengeluaran.lisensi),i.push(t.pengeluaran.thr),i.push(t.pengeluaran.lainlain),i.push(t.pengeluaran.total),i.push(t.pemasukan.total-t.pengeluaran.total),st+=t.pengeluaran.total,n.push(i)});const u=[];u.push("TOTAL"),u.push(""),u.push(""),u.push(""),f.forEach(t=>{u.push(T[t.id])});const B=((M=l==null?void 0:l.data)==null?void 0:M.reduce((t,i)=>t+d(i.totalbiaya),0))||0,G=((E=l==null?void 0:l.data)==null?void 0:E.reduce((t,i)=>t+d(i.daftar),0))||0,U=((Y=l==null?void 0:l.data)==null?void 0:Y.reduce((t,i)=>t+d(i.modul),0))||0,K=((lt=l==null?void 0:l.data)==null?void 0:lt.reduce((t,i)=>t+d(i.kaos),0))||0,_=((ht=l==null?void 0:l.data)==null?void 0:ht.reduce((t,i)=>t+d(i.kas),0))||0,O=((at=l==null?void 0:l.data)==null?void 0:at.reduce((t,i)=>t+d(i.lainlain),0))||0;u.push(B),u.push(G),u.push(U),u.push(K),u.push(_),u.push(O),u.push(H),u.push(""),u.push(""),u.push("");let y=0;e!=null&&e.data&&e.data.forEach(t=>{t.gurus&&t.gurus.length>0?y+=t.gurus.reduce((i,o)=>i+(o.gaji||0),0):y+=d(t.gaji)}),u.push(`Total Gaji: Rp ${y.toLocaleString()}`);const V=((ut=e==null?void 0:e.data)==null?void 0:ut.reduce((t,i)=>t+d(i.atk),0))||0,I=((rt=e==null?void 0:e.data)==null?void 0:rt.reduce((t,i)=>t+d(i.sewa),0))||0,z=((mt=e==null?void 0:e.data)==null?void 0:mt.reduce((t,i)=>t+d(i.intensif),0))||0,C=((nt=e==null?void 0:e.data)==null?void 0:nt.reduce((t,i)=>t+d(i.lisensi),0))||0,s=((ft=e==null?void 0:e.data)==null?void 0:ft.reduce((t,i)=>t+d(i.thr),0))||0,c=((pt=e==null?void 0:e.data)==null?void 0:pt.reduce((t,i)=>t+d(i.lainlain),0))||0;u.push(V),u.push(I),u.push(z),u.push(C),u.push(s),u.push(c),u.push(Z),u.push(Q),n.push(u);const p=W.aoa_to_sheet(n),$=A.map(()=>({width:15}));p["!cols"]=$;const j=n.length-1;for(let t=0;t<A.length;t++){const i=W.encode_cell({r:j,c:t});p[i]||(p[i]={}),p[i].s={font:{bold:!0}}}W.book_append_sheet(S,p,"Rekap Gabungan");const J=`Rekap_Gabungan_${m}.xlsx`;gt(S,J)},xt=()=>{var u,B,G,U,K,_,O,y,V,I,z,C;const l=window.open("","_blank"),e=s=>typeof s=="number"?s:parseInt(s,10)||0,L=b||[];let m=`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Laporan Rekap Bulanan ${v.toUpperCase()} ${R}</title>
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
                    <h2>${v.toUpperCase()} ${R}</h2>
                </div>

                <div class="summary">
                    <div class="summary-item">
                        <div>Total Laba</div>
                        <div class="summary-value">Rp ${Q.toLocaleString()}</div>
                    </div>
                    <div class="summary-item">
                        <div>Total Pemasukan</div>
                        <div class="summary-value">Rp ${H.toLocaleString()}</div>
                    </div>
                    <div class="summary-item">
                        <div>Total Pengeluaran</div>
                        <div class="summary-value">Rp ${Z.toLocaleString()}</div>
                    </div>
                    <div class="summary-item">
                        <div>Total Siswa</div>
                        <div class="summary-value">${ct}</div>
                    </div>
                </div>

                <div class="section-title">LAPORAN PEMASUKAN</div>
                <table>
                    <thead>
                        <tr>
                            <th>Hari</th>
                            <th>Tanggal</th>
                            <th>Pembuat Laporan</th>
                            <th>Cabang</th>`;L.forEach(s=>{m+=`<th>${s.nama_paket}<br>(Rp ${s.harga.toLocaleString()})</th>`}),m+=`
                            <th>Total Biaya</th>
                            <th>Daftar</th>
                            <th>Modul</th>
                            <th>Kaos</th>
                            <th>Kas</th>
                            <th>Lain-lain</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>`;let S=0;const d={};L.forEach(s=>{d[s.id]=0}),r&&r.data&&r.data.forEach(s=>{var c,p;m+=`
                    <tr>
                        <td>${s.hari}</td>
                        <td>${s.tanggal}</td>
                        <td>${((c=s.user)==null?void 0:c.name)||"N/A"}</td>
                        <td>${((p=s.cabang)==null?void 0:p.nama)||"N/A"}</td>`,L.forEach($=>{var J,M,E;const j=((E=(M=(J=s.pakets)==null?void 0:J.find(Y=>Y.id===$.id))==null?void 0:M.pivot)==null?void 0:E.jumlah)||0;d[$.id]+=j,m+=`<td>${j}</td>`}),m+=`
                        <td>Rp ${e(s.totalbiaya).toLocaleString()}</td>
                        <td>Rp ${e(s.daftar).toLocaleString()}</td>
                        <td>Rp ${e(s.modul).toLocaleString()}</td>
                        <td>Rp ${e(s.kaos).toLocaleString()}</td>
                        <td>Rp ${e(s.kas).toLocaleString()}</td>
                        <td>Rp ${e(s.lainlain).toLocaleString()}</td>
                        <td>Rp ${e(s.totalpemasukan).toLocaleString()}</td>
                    </tr>`,S+=e(s.totalpemasukan)}),m+=`
                <tr class="total-row">
                    <td colspan="4"><strong>TOTAL</strong></td>`,L.forEach(s=>{m+=`<td><strong>${d[s.id]}</strong></td>`});const f=((u=r==null?void 0:r.data)==null?void 0:u.reduce((s,c)=>s+e(c.totalbiaya),0))||0,n=((B=r==null?void 0:r.data)==null?void 0:B.reduce((s,c)=>s+e(c.daftar),0))||0,N=((G=r==null?void 0:r.data)==null?void 0:G.reduce((s,c)=>s+e(c.modul),0))||0,g=((U=r==null?void 0:r.data)==null?void 0:U.reduce((s,c)=>s+e(c.kaos),0))||0,w=((K=r==null?void 0:r.data)==null?void 0:K.reduce((s,c)=>s+e(c.kas),0))||0,X=((_=r==null?void 0:r.data)==null?void 0:_.reduce((s,c)=>s+e(c.lainlain),0))||0;m+=`
                    <td><strong>Rp ${f.toLocaleString()}</strong></td>
                    <td><strong>Rp ${n.toLocaleString()}</strong></td>
                    <td><strong>Rp ${N.toLocaleString()}</strong></td>
                    <td><strong>Rp ${g.toLocaleString()}</strong></td>
                    <td><strong>Rp ${w.toLocaleString()}</strong></td>
                    <td><strong>Rp ${X.toLocaleString()}</strong></td>
                    <td><strong>Rp ${H.toLocaleString()}</strong></td>
                </tr>
            </tbody>
        </table>

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
            <tbody>`,h&&h.data&&h.data.forEach(s=>{var p,$;const c=s.gurus&&s.gurus.length>0?s.gurus.map(j=>`${j.guru_nama}: Rp ${(j.gaji||0).toLocaleString()}`).join("<br>"):"N/A";m+=`
                    <tr>
                        <td>${s.hari}</td>
                        <td>${s.tanggal}</td>
                        <td>${((p=s.user)==null?void 0:p.name)||"N/A"}</td>
                        <td>${(($=s.cabang)==null?void 0:$.nama)||"N/A"}</td>
                        <td>${c}</td>
                        <td>Rp ${e(s.atk).toLocaleString()}</td>
                        <td>Rp ${e(s.sewa).toLocaleString()}</td>
                        <td>Rp ${e(s.intensif).toLocaleString()}</td>
                        <td>Rp ${e(s.lisensi).toLocaleString()}</td>
                        <td>Rp ${e(s.thr).toLocaleString()}</td>
                        <td>Rp ${e(s.lainlain).toLocaleString()}</td>
                        <td>Rp ${e(s.totalpengeluaran).toLocaleString()}</td>
                    </tr>`});let A=0;h!=null&&h.data&&h.data.forEach(s=>{s.gurus&&s.gurus.length>0&&(A+=s.gurus.reduce((c,p)=>c+(p.gaji||0),0))});const D=((O=h==null?void 0:h.data)==null?void 0:O.reduce((s,c)=>s+e(c.atk),0))||0,x=((y=h==null?void 0:h.data)==null?void 0:y.reduce((s,c)=>s+e(c.sewa),0))||0,P=((V=h==null?void 0:h.data)==null?void 0:V.reduce((s,c)=>s+e(c.intensif),0))||0,tt=((I=h==null?void 0:h.data)==null?void 0:I.reduce((s,c)=>s+e(c.lisensi),0))||0,st=((z=h==null?void 0:h.data)==null?void 0:z.reduce((s,c)=>s+e(c.thr),0))||0,T=((C=h==null?void 0:h.data)==null?void 0:C.reduce((s,c)=>s+e(c.lainlain),0))||0;m+=`
                <tr class="total-row">
                    <td colspan="4"><strong>TOTAL</strong></td>
                    <td><strong>Total Gaji: Rp ${A.toLocaleString()}</strong></td>
                    <td><strong>Rp ${D.toLocaleString()}</strong></td>
                    <td><strong>Rp ${x.toLocaleString()}</strong></td>
                    <td><strong>Rp ${P.toLocaleString()}</strong></td>
                    <td><strong>Rp ${tt.toLocaleString()}</strong></td>
                    <td><strong>Rp ${st.toLocaleString()}</strong></td>
                    <td><strong>Rp ${T.toLocaleString()}</strong></td>
                    <td><strong>Rp ${Z.toLocaleString()}</strong></td>
                </tr>
            </tbody>
        </table>

        <div style="margin-top: 30px; text-align: center; font-size: 14px;">
            <p>Dicetak pada: ${new Date().toLocaleString("id-ID")}</p>
        </div>

        </body>
        </html>`,l.document.write(m),l.document.close(),l.focus(),setTimeout(()=>{l.print()},500)};return a.jsxs(vt,{children:[a.jsxs("div",{className:"grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 pb-10",children:[a.jsx(F,{title:"Total Laba",total:`Rp ${Q.toLocaleString()}`,rate:"",levelUp:!0,children:a.jsxs("svg",{className:"fill-primary dark:fill-white",width:"22",height:"16",viewBox:"0 0 22 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[a.jsx("path",{d:"M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z",fill:""}),a.jsx("path",{d:"M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z",fill:""})]})}),a.jsx(F,{title:"Total Profit",total:`Rp ${H.toLocaleString()}`,rate:"",levelUp:!0,children:a.jsxs("svg",{className:"fill-primary dark:fill-white",width:"20",height:"22",viewBox:"0 0 20 22",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[a.jsx("path",{d:"M11.7531 16.4312C10.3781 16.4312 9.27808 17.5312 9.27808 18.9062C9.27808 20.2812 10.3781 21.3812 11.7531 21.3812C13.1281 21.3812 14.2281 20.2812 14.2281 18.9062C14.2281 17.5656 13.0937 16.4312 11.7531 16.4312ZM11.7531 19.8687C11.2375 19.8687 10.825 19.4562 10.825 18.9406C10.825 18.425 11.2375 18.0125 11.7531 18.0125C12.2687 18.0125 12.6812 18.425 12.6812 18.9406C12.6812 19.4219 12.2343 19.8687 11.7531 19.8687Z",fill:""}),a.jsx("path",{d:"M5.22183 16.4312C3.84683 16.4312 2.74683 17.5312 2.74683 18.9062C2.74683 20.2812 3.84683 21.3812 5.22183 21.3812C6.59683 21.3812 7.69683 20.2812 7.69683 18.9062C7.69683 17.5656 6.56245 16.4312 5.22183 16.4312ZM5.22183 19.8687C4.7062 19.8687 4.2937 19.4562 4.2937 18.9406C4.2937 18.425 4.7062 18.0125 5.22183 18.0125C5.73745 18.0125 6.14995 18.425 6.14995 18.9406C6.14995 19.4219 5.73745 19.8687 5.22183 19.8687Z",fill:""}),a.jsx("path",{d:"M19.0062 0.618744H17.15C16.325 0.618744 15.6031 1.23749 15.5 2.06249L14.95 6.01562H1.37185C1.0281 6.01562 0.684353 6.18749 0.443728 6.46249C0.237478 6.73749 0.134353 7.11562 0.237478 7.45937C0.237478 7.49374 0.237478 7.49374 0.237478 7.52812L2.36873 13.9562C2.50623 14.4375 2.9531 14.7812 3.46873 14.7812H12.9562C14.2281 14.7812 15.3281 13.8187 15.5 12.5469L16.9437 2.26874C16.9437 2.19999 17.0125 2.16562 17.0812 2.16562H18.9375C19.35 2.16562 19.7281 1.82187 19.7281 1.37499C19.7281 0.928119 19.4187 0.618744 19.0062 0.618744ZM14.0219 12.3062C13.9531 12.8219 13.5062 13.2 12.9906 13.2H3.7781L1.92185 7.56249H14.7094L14.0219 12.3062Z",fill:""})]})}),a.jsx(F,{title:"Total Outcome",total:`Rp ${Z.toLocaleString()}`,rate:"",levelUp:!0,children:a.jsxs("svg",{className:"fill-primary dark:fill-white",width:"22",height:"22",viewBox:"0 0 22 22",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[a.jsx("path",{d:"M21.1063 18.0469L19.3875 3.23126C19.2157 1.71876 17.9438 0.584381 16.3969 0.584381H5.56878C4.05628 0.584381 2.78441 1.71876 2.57816 3.23126L0.859406 18.0469C0.756281 18.9063 1.03128 19.7313 1.61566 20.3844C2.20003 21.0375 2.99066 21.3813 3.85003 21.3813H18.1157C18.975 21.3813 19.8 21.0031 20.35 20.3844C20.9 19.7656 21.2094 18.9063 21.1063 18.0469ZM19.2157 19.3531C18.9407 19.6625 18.5625 19.8344 18.15 19.8344H3.85003C3.43753 19.8344 3.05941 19.6625 2.78441 19.3531C2.50941 19.0438 2.37191 18.6313 2.44066 18.2188L4.12503 3.43751C4.19378 2.71563 4.81253 2.16563 5.56878 2.16563H16.4313C17.1532 2.16563 17.7719 2.71563 17.875 3.43751L19.5938 18.2531C19.6282 18.6656 19.4907 19.0438 19.2157 19.3531Z",fill:""}),a.jsx("path",{d:"M14.3345 5.29375C13.922 5.39688 13.647 5.80938 13.7501 6.22188C13.7845 6.42813 13.8189 6.63438 13.8189 6.80625C13.8189 8.35313 12.547 9.625 11.0001 9.625C9.45327 9.625 8.1814 8.35313 8.1814 6.80625C8.1814 6.6 8.21577 6.42813 8.25015 6.22188C8.35327 5.80938 8.07827 5.39688 7.66577 5.29375C7.25327 5.19063 6.84077 5.46563 6.73765 5.87813C6.6689 6.1875 6.63452 6.49688 6.63452 6.80625C6.63452 9.2125 8.5939 11.1719 11.0001 11.1719C13.4064 11.1719 15.3658 9.2125 15.3658 6.80625C15.3658 6.49688 15.3314 6.1875 15.2626 5.87813C15.1595 5.46563 14.747 5.225 14.3345 5.29375Z",fill:""})]})}),a.jsx(F,{title:"Total Students",total:ct,rate:"",levelUp:!0,children:a.jsxs("svg",{className:"fill-primary dark:fill-white",width:"22",height:"18",viewBox:"0 0 22 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[a.jsx("path",{d:"M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z",fill:""}),a.jsx("path",{d:"M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z",fill:""}),a.jsx("path",{d:"M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z",fill:""})]})})]}),a.jsxs("div",{className:"flex justify-center gap-4 mb-6",children:[a.jsxs("button",{onClick:()=>Lt(r,h,b,`${v}_${R}`),className:"bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded flex items-center",children:[a.jsx("svg",{className:"w-4 h-4 mr-2",fill:"currentColor",viewBox:"0 0 20 20",children:a.jsx("path",{fillRule:"evenodd",d:"M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",clipRule:"evenodd"})}),"Download Excel Gabungan"]}),a.jsxs("button",{onClick:xt,className:"bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded flex items-center",children:[a.jsx("svg",{className:"w-4 h-4 mr-2",fill:"currentColor",viewBox:"0 0 20 20",children:a.jsx("path",{fillRule:"evenodd",d:"M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z",clipRule:"evenodd"})}),"Print Laporan"]})]}),a.jsx($t,{laporanCabang:r,pakets:b||[],bulan:v,tahun:R,nextMonth:it,nextYear:et,prevMonth:ot,prevYear:dt}),a.jsx(jt,{laporanPengeluaranCabang:h,bulan:v,tahun:R,nextMonth:it,nextYear:et,prevMonth:ot,prevYear:dt})]})};export{Bt as default};
