<<<<<<<< HEAD:public/build/assets/index-GEQLl2JZ.js
import{j as h}from"./app-DPBPjsud.js";import{D as b1}from"./DefaultLayout-fsByN9bI.js";import{C as V}from"./CardDataStats-La4-1UVu.js";import{u as z,w as w1}from"./xlsx-DjuO7_Ju.js";import"./flowbite.min-Dyi2Wf9s.js";import v1 from"./TablePemasukanRekap-Bnal3xF8.js";import j1 from"./TablePengeluaranRekap-BrLiHP4-.js";import"./index-CDcaZBKG.js";import"./sweetalert2.esm.all-5zhdP7Ax.js";import"./index-dX6QUltf.js";const Z1=({laporanMitra:m,laporanPengeluaranMitra:f,bulan:w,tahun:j,nextMonth:r,nextYear:P,prevMonth:M,prevYear:t1,paketMitra:J})=>{const g1=(c,o)=>{Array.isArray(c)||(c=[]),Array.isArray(o)||(o=[]);const k=c.reduce((C,n)=>C+(n.totalpemasukan||0),0),a=o.reduce((C,n)=>C+(n.totalpengeluaran||0),0),$=k-a,d=c.reduce((C,n)=>C+((n.biaya_5000||0)+(n.biaya_8000||0)+(n.biaya_10000||0)+(n.biaya_15000||0)),0);return{totalLaba:$,totalProfit:k,totalOutcome:a,totalStudents:d}},{totalLaba:F,totalProfit:T,totalOutcome:N,totalStudents:s1}=g1((m==null?void 0:m.data)||[],(f==null?void 0:f.data)||[]),C1=(c,o,k,a)=>{var e1,o1,d1,i1,c1,h1,l1,m1,u1,f1,n1,a1;const $=z.book_new(),d=t=>typeof t=="number"?t:parseInt(t,10)||0,C=k||[],n=[],W=3+C.length+7+1,A=[`LAPORAN PEMASUKAN BULAN ${w.toUpperCase()} ${j}`];for(let t=1;t<W;t++)A.push("");A.push(`LAPORAN PENGELUARAN BULAN ${w.toUpperCase()}`),n.push(A);const y=["Hari","Tanggal","Nama"];C.forEach(t=>{y.push(`${t.nama_paket} (${t.harga.toLocaleString()})`)}),y.push("Total Biaya","Daftar","Modul","Kaos","Kas","Lain Lain","Jumlah","");const q=["Pembuat Laporan","Detail Gaji Mitra","ATK","Sewa","Intensif","Lisensi","THR","Lain Lain","Jumlah","Albri"],p=[...y,...q];n.push(p);const Q=(t,s)=>{var g;if(!t.pakets)return 0;const i=t.pakets.find(O=>O.id===s);return i?d((g=i.pivot)==null?void 0:g.jumlah):0},L=new Map;c&&c.data&&c.data.forEach(t=>{const s=t.tanggal;L.has(s)||L.set(s,{hari:t.hari,tanggal:t.tanggal,pemasukan:{nama:[],pakets:{},totalbiaya:0,daftar:0,modul:0,kaos:0,kas:0,lainlain:0,total:0},pengeluaran:{pembuat:[],gajiDetail:[],atk:0,sewa:0,intensif:0,lisensi:0,thr:0,lainlain:0,total:0}});const i=L.get(s);t.user&&t.user.name&&(i.pemasukan.nama.includes(t.user.name)||i.pemasukan.nama.push(t.user.name)),C.forEach(g=>{i.pemasukan.pakets[g.id]||(i.pemasukan.pakets[g.id]=0),i.pemasukan.pakets[g.id]+=Q(t,g.id)}),i.pemasukan.totalbiaya+=d(t.totalbiaya),i.pemasukan.daftar+=d(t.daftar),i.pemasukan.modul+=d(t.modul),i.pemasukan.kaos+=d(t.kaos),i.pemasukan.kas+=d(t.kas),i.pemasukan.lainlain+=d(t.lainlain),i.pemasukan.total+=d(t.totalpemasukan)}),o&&o.data&&o.data.forEach(t=>{const s=t.tanggal;L.has(s)||L.set(s,{hari:t.hari,tanggal:t.tanggal,pemasukan:{nama:[],pakets:{},totalbiaya:0,daftar:0,modul:0,kaos:0,kas:0,lainlain:0,total:0},pengeluaran:{pembuat:[],gajiDetail:[],atk:0,sewa:0,intensif:0,lisensi:0,thr:0,lainlain:0,total:0}});const i=L.get(s);if(t.user&&t.user.name&&(i.pengeluaran.pembuat.includes(t.user.name)||i.pengeluaran.pembuat.push(t.user.name)),t.mitras&&t.mitras.length>0)t.mitras.forEach(g=>{const O=`${g.mitra_nama}: Rp ${(g.gaji||0).toLocaleString()}`;i.pengeluaran.gajiDetail.includes(O)||i.pengeluaran.gajiDetail.push(O)});else if(t.gaji&&t.gaji>0){const g=`Gaji Mitra: Rp ${d(t.gaji).toLocaleString()}`;i.pengeluaran.gajiDetail.includes(g)||i.pengeluaran.gajiDetail.push(g)}i.pengeluaran.atk+=d(t.atk),i.pengeluaran.sewa+=d(t.sewa),i.pengeluaran.intensif+=d(t.intensif),i.pengeluaran.lisensi+=d(t.lisensi),i.pengeluaran.thr+=d(t.thr),i.pengeluaran.lainlain+=d(t.lainlain),i.pengeluaran.total+=d(t.totalpengeluaran)});const X=Array.from(L.values()).sort((t,s)=>new Date(t.tanggal)-new Date(s.tanggal));let D=0,E=0;const R={};C.forEach(t=>{R[t.id]=0}),X.forEach(t=>{const s=[];s.push(t.hari),s.push(t.tanggal),s.push(t.pemasukan.nama.join(", ")||"N/A"),C.forEach(i=>{const g=t.pemasukan.pakets[i.id]||0;s.push(g),R[i.id]+=g}),s.push(t.pemasukan.totalbiaya),s.push(t.pemasukan.daftar),s.push(t.pemasukan.modul),s.push(t.pemasukan.kaos),s.push(t.pemasukan.kas),s.push(t.pemasukan.lainlain),s.push(t.pemasukan.total),s.push(""),D+=t.pemasukan.total,s.push(t.pengeluaran.pembuat.join(", ")||"N/A"),s.push(t.pengeluaran.gajiDetail.join("; ")||"N/A"),s.push(t.pengeluaran.atk),s.push(t.pengeluaran.sewa),s.push(t.pengeluaran.intensif),s.push(t.pengeluaran.lisensi),s.push(t.pengeluaran.thr),s.push(t.pengeluaran.lainlain),s.push(t.pengeluaran.total),s.push(t.pemasukan.total-t.pengeluaran.total),E+=t.pengeluaran.total,n.push(s)});const u=[];u.push("TOTAL"),u.push(""),u.push(""),C.forEach(t=>{u.push(R[t.id])});const H=((e1=c==null?void 0:c.data)==null?void 0:e1.reduce((t,s)=>t+d(s.totalbiaya),0))||0,Z=((o1=c==null?void 0:c.data)==null?void 0:o1.reduce((t,s)=>t+d(s.daftar),0))||0,_=((d1=c==null?void 0:c.data)==null?void 0:d1.reduce((t,s)=>t+d(s.modul),0))||0,B=((i1=c==null?void 0:c.data)==null?void 0:i1.reduce((t,s)=>t+d(s.kaos),0))||0,U=((c1=c==null?void 0:c.data)==null?void 0:c1.reduce((t,s)=>t+d(s.kas),0))||0,G=((h1=c==null?void 0:c.data)==null?void 0:h1.reduce((t,s)=>t+d(s.lainlain),0))||0;u.push(H),u.push(Z),u.push(_),u.push(B),u.push(U),u.push(G),u.push(T),u.push(""),u.push("");let S=0;o!=null&&o.data&&o.data.forEach(t=>{t.mitras&&t.mitras.length>0?S+=t.mitras.reduce((s,i)=>s+(i.gaji||0),0):S+=d(t.gaji)}),u.push(`Total Gaji: Rp ${S.toLocaleString()}`);const e=((l1=o==null?void 0:o.data)==null?void 0:l1.reduce((t,s)=>t+d(s.atk),0))||0,l=((m1=o==null?void 0:o.data)==null?void 0:m1.reduce((t,s)=>t+d(s.sewa),0))||0,x=((u1=o==null?void 0:o.data)==null?void 0:u1.reduce((t,s)=>t+d(s.intensif),0))||0,v=((f1=o==null?void 0:o.data)==null?void 0:f1.reduce((t,s)=>t+d(s.lisensi),0))||0,I=((n1=o==null?void 0:o.data)==null?void 0:n1.reduce((t,s)=>t+d(s.thr),0))||0,K=((a1=o==null?void 0:o.data)==null?void 0:a1.reduce((t,s)=>t+d(s.lainlain),0))||0;u.push(e),u.push(l),u.push(x),u.push(v),u.push(I),u.push(K),u.push(N),u.push(F),n.push(u);const b=z.aoa_to_sheet(n),Y=p.map(()=>({width:15}));b["!cols"]=Y;const L1=n.length-1;for(let t=0;t<p.length;t++){const s=z.encode_cell({r:L1,c:t});b[s]||(b[s]={}),b[s].s={font:{bold:!0}}}z.book_append_sheet($,b,"Rekap Gabungan Mitra");const x1=`Rekap_Gabungan_Mitra_${a}.xlsx`;w1($,x1)},k1=()=>{var E,R,u,H,Z,_,B,U,G,S;const c=window.open("","_blank"),o=e=>typeof e=="number"?e:parseInt(e,10)||0,k=J||[];let a=`
========
import{j as h}from"./app-CxGSB-fu.js";import{D as b1}from"./DefaultLayout-yz6_CS4R.js";import{C as V}from"./CardDataStats-wYALjVNb.js";import{u as z,w as w1}from"./xlsx-DjuO7_Ju.js";import"./flowbite.min-Dyi2Wf9s.js";import v1 from"./TablePemasukanRekap-CBZLxp-h.js";import j1 from"./TablePengeluaranRekap-HllSY1Qa.js";import"./index-DM5UpuYt.js";import"./sweetalert2.esm.all-5zhdP7Ax.js";import"./index-DeQNj7PW.js";const Z1=({laporanMitra:m,laporanPengeluaranMitra:f,bulan:w,tahun:j,nextMonth:r,nextYear:P,prevMonth:M,prevYear:t1,paketMitra:J})=>{const g1=(c,o)=>{Array.isArray(c)||(c=[]),Array.isArray(o)||(o=[]);const k=c.reduce((C,n)=>C+(n.totalpemasukan||0),0),a=o.reduce((C,n)=>C+(n.totalpengeluaran||0),0),$=k-a,d=c.reduce((C,n)=>C+((n.biaya_5000||0)+(n.biaya_8000||0)+(n.biaya_10000||0)+(n.biaya_15000||0)),0);return{totalLaba:$,totalProfit:k,totalOutcome:a,totalStudents:d}},{totalLaba:F,totalProfit:T,totalOutcome:N,totalStudents:s1}=g1((m==null?void 0:m.data)||[],(f==null?void 0:f.data)||[]),C1=(c,o,k,a)=>{var e1,o1,d1,i1,c1,h1,l1,m1,u1,f1,n1,a1;const $=z.book_new(),d=t=>typeof t=="number"?t:parseInt(t,10)||0,C=k||[],n=[],W=3+C.length+7+1,A=[`LAPORAN PEMASUKAN BULAN ${w.toUpperCase()} ${j}`];for(let t=1;t<W;t++)A.push("");A.push(`LAPORAN PENGELUARAN BULAN ${w.toUpperCase()}`),n.push(A);const y=["Hari","Tanggal","Nama"];C.forEach(t=>{y.push(`${t.nama_paket} (${t.harga.toLocaleString()})`)}),y.push("Total Biaya","Daftar","Modul","Kaos","Kas","Lain Lain","Jumlah","");const q=["Pembuat Laporan","Detail Gaji Mitra","ATK","Sewa","Intensif","Lisensi","THR","Lain Lain","Jumlah","Albri"],p=[...y,...q];n.push(p);const Q=(t,s)=>{var g;if(!t.pakets)return 0;const i=t.pakets.find(O=>O.id===s);return i?d((g=i.pivot)==null?void 0:g.jumlah):0},L=new Map;c&&c.data&&c.data.forEach(t=>{const s=t.tanggal;L.has(s)||L.set(s,{hari:t.hari,tanggal:t.tanggal,pemasukan:{nama:[],pakets:{},totalbiaya:0,daftar:0,modul:0,kaos:0,kas:0,lainlain:0,total:0},pengeluaran:{pembuat:[],gajiDetail:[],atk:0,sewa:0,intensif:0,lisensi:0,thr:0,lainlain:0,total:0}});const i=L.get(s);t.user&&t.user.name&&(i.pemasukan.nama.includes(t.user.name)||i.pemasukan.nama.push(t.user.name)),C.forEach(g=>{i.pemasukan.pakets[g.id]||(i.pemasukan.pakets[g.id]=0),i.pemasukan.pakets[g.id]+=Q(t,g.id)}),i.pemasukan.totalbiaya+=d(t.totalbiaya),i.pemasukan.daftar+=d(t.daftar),i.pemasukan.modul+=d(t.modul),i.pemasukan.kaos+=d(t.kaos),i.pemasukan.kas+=d(t.kas),i.pemasukan.lainlain+=d(t.lainlain),i.pemasukan.total+=d(t.totalpemasukan)}),o&&o.data&&o.data.forEach(t=>{const s=t.tanggal;L.has(s)||L.set(s,{hari:t.hari,tanggal:t.tanggal,pemasukan:{nama:[],pakets:{},totalbiaya:0,daftar:0,modul:0,kaos:0,kas:0,lainlain:0,total:0},pengeluaran:{pembuat:[],gajiDetail:[],atk:0,sewa:0,intensif:0,lisensi:0,thr:0,lainlain:0,total:0}});const i=L.get(s);if(t.user&&t.user.name&&(i.pengeluaran.pembuat.includes(t.user.name)||i.pengeluaran.pembuat.push(t.user.name)),t.mitras&&t.mitras.length>0)t.mitras.forEach(g=>{const O=`${g.mitra_nama}: Rp ${(g.gaji||0).toLocaleString()}`;i.pengeluaran.gajiDetail.includes(O)||i.pengeluaran.gajiDetail.push(O)});else if(t.gaji&&t.gaji>0){const g=`Gaji Mitra: Rp ${d(t.gaji).toLocaleString()}`;i.pengeluaran.gajiDetail.includes(g)||i.pengeluaran.gajiDetail.push(g)}i.pengeluaran.atk+=d(t.atk),i.pengeluaran.sewa+=d(t.sewa),i.pengeluaran.intensif+=d(t.intensif),i.pengeluaran.lisensi+=d(t.lisensi),i.pengeluaran.thr+=d(t.thr),i.pengeluaran.lainlain+=d(t.lainlain),i.pengeluaran.total+=d(t.totalpengeluaran)});const X=Array.from(L.values()).sort((t,s)=>new Date(t.tanggal)-new Date(s.tanggal));let D=0,E=0;const R={};C.forEach(t=>{R[t.id]=0}),X.forEach(t=>{const s=[];s.push(t.hari),s.push(t.tanggal),s.push(t.pemasukan.nama.join(", ")||"N/A"),C.forEach(i=>{const g=t.pemasukan.pakets[i.id]||0;s.push(g),R[i.id]+=g}),s.push(t.pemasukan.totalbiaya),s.push(t.pemasukan.daftar),s.push(t.pemasukan.modul),s.push(t.pemasukan.kaos),s.push(t.pemasukan.kas),s.push(t.pemasukan.lainlain),s.push(t.pemasukan.total),s.push(""),D+=t.pemasukan.total,s.push(t.pengeluaran.pembuat.join(", ")||"N/A"),s.push(t.pengeluaran.gajiDetail.join("; ")||"N/A"),s.push(t.pengeluaran.atk),s.push(t.pengeluaran.sewa),s.push(t.pengeluaran.intensif),s.push(t.pengeluaran.lisensi),s.push(t.pengeluaran.thr),s.push(t.pengeluaran.lainlain),s.push(t.pengeluaran.total),s.push(t.pemasukan.total-t.pengeluaran.total),E+=t.pengeluaran.total,n.push(s)});const u=[];u.push("TOTAL"),u.push(""),u.push(""),C.forEach(t=>{u.push(R[t.id])});const H=((e1=c==null?void 0:c.data)==null?void 0:e1.reduce((t,s)=>t+d(s.totalbiaya),0))||0,Z=((o1=c==null?void 0:c.data)==null?void 0:o1.reduce((t,s)=>t+d(s.daftar),0))||0,_=((d1=c==null?void 0:c.data)==null?void 0:d1.reduce((t,s)=>t+d(s.modul),0))||0,B=((i1=c==null?void 0:c.data)==null?void 0:i1.reduce((t,s)=>t+d(s.kaos),0))||0,U=((c1=c==null?void 0:c.data)==null?void 0:c1.reduce((t,s)=>t+d(s.kas),0))||0,G=((h1=c==null?void 0:c.data)==null?void 0:h1.reduce((t,s)=>t+d(s.lainlain),0))||0;u.push(H),u.push(Z),u.push(_),u.push(B),u.push(U),u.push(G),u.push(T),u.push(""),u.push("");let S=0;o!=null&&o.data&&o.data.forEach(t=>{t.mitras&&t.mitras.length>0?S+=t.mitras.reduce((s,i)=>s+(i.gaji||0),0):S+=d(t.gaji)}),u.push(`Total Gaji: Rp ${S.toLocaleString()}`);const e=((l1=o==null?void 0:o.data)==null?void 0:l1.reduce((t,s)=>t+d(s.atk),0))||0,l=((m1=o==null?void 0:o.data)==null?void 0:m1.reduce((t,s)=>t+d(s.sewa),0))||0,x=((u1=o==null?void 0:o.data)==null?void 0:u1.reduce((t,s)=>t+d(s.intensif),0))||0,v=((f1=o==null?void 0:o.data)==null?void 0:f1.reduce((t,s)=>t+d(s.lisensi),0))||0,I=((n1=o==null?void 0:o.data)==null?void 0:n1.reduce((t,s)=>t+d(s.thr),0))||0,K=((a1=o==null?void 0:o.data)==null?void 0:a1.reduce((t,s)=>t+d(s.lainlain),0))||0;u.push(e),u.push(l),u.push(x),u.push(v),u.push(I),u.push(K),u.push(N),u.push(F),n.push(u);const b=z.aoa_to_sheet(n),Y=p.map(()=>({width:15}));b["!cols"]=Y;const L1=n.length-1;for(let t=0;t<p.length;t++){const s=z.encode_cell({r:L1,c:t});b[s]||(b[s]={}),b[s].s={font:{bold:!0}}}z.book_append_sheet($,b,"Rekap Gabungan Mitra");const x1=`Rekap_Gabungan_Mitra_${a}.xlsx`;w1($,x1)},k1=()=>{var E,R,u,H,Z,_,B,U,G,S;const c=window.open("","_blank"),o=e=>typeof e=="number"?e:parseInt(e,10)||0,k=J||[];let a=`
>>>>>>>> 7ba683b29899470a9bcc910837b1637138954cb0:public/build/assets/index-CvHHuMpd.js
            <!DOCTYPE html>
            <html>
            <head>
                <title>Laporan Rekap Bulanan Mitra ${w.toUpperCase()} ${j}</title>
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
                    <h2>${w.toUpperCase()} ${j}</h2>
                </div>

                <div class="summary">
                    <div class="summary-item">
                        <div>Total Laba</div>
                        <div class="summary-value">Rp ${F.toLocaleString()}</div>
                    </div>
                    <div class="summary-item">
                        <div>Total Pemasukan</div>
                        <div class="summary-value">Rp ${T.toLocaleString()}</div>
                    </div>
                    <div class="summary-item">
                        <div>Total Pengeluaran</div>
                        <div class="summary-value">Rp ${N.toLocaleString()}</div>
                    </div>
                    <div class="summary-item">
                        <div>Total Siswa</div>
                        <div class="summary-value">${s1}</div>
                    </div>
                </div>

                <div class="section-title">LAPORAN PEMASUKAN MITRA</div>
                <table>
                    <thead>
                        <tr>
                            <th>Hari</th>
                            <th>Tanggal</th>
                            <th>Pembuat Laporan</th>`;k.forEach(e=>{a+=`<th>${e.nama_paket}<br>(Rp ${e.harga.toLocaleString()})</th>`}),a+=`
                            <th>Total Biaya</th>
                            <th>Daftar</th>
                            <th>Modul</th>
                            <th>Kaos</th>
                            <th>Kas</th>
                            <th>Lain-lain</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>`;let $=0;const d={};k.forEach(e=>{d[e.id]=0}),m&&m.data&&m.data.forEach(e=>{var l;a+=`
                    <tr>
                        <td>${e.hari}</td>
                        <td>${e.tanggal}</td>
                        <td>${((l=e.user)==null?void 0:l.name)||"N/A"}</td>`,k.forEach(x=>{var I,K,b;const v=((b=(K=(I=e.pakets)==null?void 0:I.find(Y=>Y.id===x.id))==null?void 0:K.pivot)==null?void 0:b.jumlah)||0;d[x.id]+=v,a+=`<td>${v}</td>`}),a+=`
                        <td>Rp ${o(e.totalbiaya).toLocaleString()}</td>
                        <td>Rp ${o(e.daftar).toLocaleString()}</td>
                        <td>Rp ${o(e.modul).toLocaleString()}</td>
                        <td>Rp ${o(e.kaos).toLocaleString()}</td>
                        <td>Rp ${o(e.kas).toLocaleString()}</td>
                        <td>Rp ${o(e.lainlain).toLocaleString()}</td>
                        <td>Rp ${o(e.totalpemasukan).toLocaleString()}</td>
                    </tr>`,$+=o(e.totalpemasukan)}),a+=`
                <tr class="total-row">
                    <td colspan="3"><strong>TOTAL</strong></td>`,k.forEach(e=>{a+=`<td><strong>${d[e.id]}</strong></td>`});const C=((E=m==null?void 0:m.data)==null?void 0:E.reduce((e,l)=>e+o(l.totalbiaya),0))||0,n=((R=m==null?void 0:m.data)==null?void 0:R.reduce((e,l)=>e+o(l.daftar),0))||0,W=((u=m==null?void 0:m.data)==null?void 0:u.reduce((e,l)=>e+o(l.modul),0))||0,A=((H=m==null?void 0:m.data)==null?void 0:H.reduce((e,l)=>e+o(l.kaos),0))||0,y=((Z=m==null?void 0:m.data)==null?void 0:Z.reduce((e,l)=>e+o(l.kas),0))||0,q=((_=m==null?void 0:m.data)==null?void 0:_.reduce((e,l)=>e+o(l.lainlain),0))||0;a+=`
                    <td><strong>Rp ${C.toLocaleString()}</strong></td>
                    <td><strong>Rp ${n.toLocaleString()}</strong></td>
                    <td><strong>Rp ${W.toLocaleString()}</strong></td>
                    <td><strong>Rp ${A.toLocaleString()}</strong></td>
                    <td><strong>Rp ${y.toLocaleString()}</strong></td>
                    <td><strong>Rp ${q.toLocaleString()}</strong></td>
                    <td><strong>Rp ${T.toLocaleString()}</strong></td>
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
            <tbody>`,f&&f.data&&f.data.forEach(e=>{var x;const l=e.mitras&&e.mitras.length>0?e.mitras.map(v=>`${v.mitra_nama}: Rp ${(v.gaji||0).toLocaleString()}`).join("<br>"):"N/A";a+=`
                    <tr>
                        <td>${e.hari}</td>
                        <td>${e.tanggal}</td>
                        <td>${((x=e.user)==null?void 0:x.name)||"N/A"}</td>
                        <td>${l}</td>
                        <td>Rp ${o(e.atk).toLocaleString()}</td>
                        <td>Rp ${o(e.intensif).toLocaleString()}</td>
                        <td>Rp ${o(e.lisensi).toLocaleString()}</td>
                        <td>Rp ${o(e.lainlain).toLocaleString()}</td>
                        <td>Rp ${o(e.totalpengeluaran).toLocaleString()}</td>
                    </tr>`});let p=0;f!=null&&f.data&&f.data.forEach(e=>{e.mitras&&e.mitras.length>0&&(p+=e.mitras.reduce((l,x)=>l+(x.gaji||0),0))});const Q=((B=f==null?void 0:f.data)==null?void 0:B.reduce((e,l)=>e+o(l.atk),0))||0,L=((U=f==null?void 0:f.data)==null?void 0:U.reduce((e,l)=>e+o(l.intensif),0))||0,X=((G=f==null?void 0:f.data)==null?void 0:G.reduce((e,l)=>e+o(l.lisensi),0))||0,D=((S=f==null?void 0:f.data)==null?void 0:S.reduce((e,l)=>e+o(l.lainlain),0))||0;a+=`
                <tr class="total-row">
                    <td colspan="3"><strong>TOTAL</strong></td>
                    <td><strong>Total Gaji: Rp ${p.toLocaleString()}</strong></td>
                    <td><strong>Rp ${Q.toLocaleString()}</strong></td>
                    <td><strong>Rp ${L.toLocaleString()}</strong></td>
                    <td><strong>Rp ${X.toLocaleString()}</strong></td>
                    <td><strong>Rp ${D.toLocaleString()}</strong></td>
                    <td><strong>Rp ${N.toLocaleString()}</strong></td>
                </tr>
            </tbody>
        </table>

        <div style="margin-top: 30px; text-align: center; font-size: 14px;">
            <p>Dicetak pada: ${new Date().toLocaleString("id-ID")}</p>
        </div>

        </body>
        </html>`,c.document.write(a),c.document.close(),c.focus(),setTimeout(()=>{c.print()},500)};return h.jsxs(b1,{children:[h.jsxs("div",{className:"grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 pb-10",children:[h.jsx(V,{title:"Total Laba",total:`Rp ${F.toLocaleString()}`,rate:"",levelUp:!0,children:h.jsxs("svg",{className:"fill-primary dark:fill-white",width:"22",height:"16",viewBox:"0 0 22 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[h.jsx("path",{d:"M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z",fill:""}),h.jsx("path",{d:"M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z",fill:""})]})}),h.jsx(V,{title:"Total Profit",total:`Rp ${T.toLocaleString()}`,rate:"",levelUp:!0,children:h.jsxs("svg",{className:"fill-primary dark:fill-white",width:"20",height:"22",viewBox:"0 0 20 22",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[h.jsx("path",{d:"M11.7531 16.4312C10.3781 16.4312 9.27808 17.5312 9.27808 18.9062C9.27808 20.2812 10.3781 21.3812 11.7531 21.3812C13.1281 21.3812 14.2281 20.2812 14.2281 18.9062C14.2281 17.5656 13.0937 16.4312 11.7531 16.4312ZM11.7531 19.8687C11.2375 19.8687 10.825 19.4562 10.825 18.9406C10.825 18.425 11.2375 18.0125 11.7531 18.0125C12.2687 18.0125 12.6812 18.425 12.6812 18.9406C12.6812 19.4219 12.2343 19.8687 11.7531 19.8687Z",fill:""}),h.jsx("path",{d:"M5.22183 16.4312C3.84683 16.4312 2.74683 17.5312 2.74683 18.9062C2.74683 20.2812 3.84683 21.3812 5.22183 21.3812C6.59683 21.3812 7.69683 20.2812 7.69683 18.9062C7.69683 17.5656 6.56245 16.4312 5.22183 16.4312ZM5.22183 19.8687C4.7062 19.8687 4.2937 19.4562 4.2937 18.9406C4.2937 18.425 4.7062 18.0125 5.22183 18.0125C5.73745 18.0125 6.14995 18.425 6.14995 18.9406C6.14995 19.4219 5.73745 19.8687 5.22183 19.8687Z",fill:""}),h.jsx("path",{d:"M19.0062 0.618744H17.15C16.325 0.618744 15.6031 1.23749 15.5 2.06249L14.95 6.01562H1.37185C1.0281 6.01562 0.684353 6.18749 0.443728 6.46249C0.237478 6.73749 0.134353 7.11562 0.237478 7.45937C0.237478 7.49374 0.237478 7.49374 0.237478 7.52812L2.36873 13.9562C2.50623 14.4375 2.9531 14.7812 3.46873 14.7812H12.9562C14.2281 14.7812 15.3281 13.8187 15.5 12.5469L16.9437 2.26874C16.9437 2.19999 17.0125 2.16562 17.0812 2.16562H18.9375C19.35 2.16562 19.7281 1.82187 19.7281 1.37499C19.7281 0.928119 19.4187 0.618744 19.0062 0.618744ZM14.0219 12.3062C13.9531 12.8219 13.5062 13.2 12.9906 13.2H3.7781L1.92185 7.56249H14.7094L14.0219 12.3062Z",fill:""})]})}),h.jsx(V,{title:"Total Outcome",total:`Rp ${N.toLocaleString()}`,rate:"",levelUp:!0,children:h.jsxs("svg",{className:"fill-primary dark:fill-white",width:"22",height:"22",viewBox:"0 0 22 22",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[h.jsx("path",{d:"M21.1063 18.0469L19.3875 3.23126C19.2157 1.71876 17.9438 0.584381 16.3969 0.584381H5.56878C4.05628 0.584381 2.78441 1.71876 2.57816 3.23126L0.859406 18.0469C0.756281 18.9063 1.03128 19.7313 1.61566 20.3844C2.20003 21.0375 2.99066 21.3813 3.85003 21.3813H18.1157C18.975 21.3813 19.8 21.0031 20.35 20.3844C20.9 19.7656 21.2094 18.9063 21.1063 18.0469ZM19.2157 19.3531C18.9407 19.6625 18.5625 19.8344 18.15 19.8344H3.85003C3.43753 19.8344 3.05941 19.6625 2.78441 19.3531C2.50941 19.0438 2.37191 18.6313 2.44066 18.2188L4.12503 3.43751C4.19378 2.71563 4.81253 2.16563 5.56878 2.16563H16.4313C17.1532 2.16563 17.7719 2.71563 17.875 3.43751L19.5938 18.2531C19.6282 18.6656 19.4907 19.0438 19.2157 19.3531Z",fill:""}),h.jsx("path",{d:"M14.3345 5.29375C13.922 5.39688 13.647 5.80938 13.7501 6.22188C13.7845 6.42813 13.8189 6.63438 13.8189 6.80625C13.8189 8.35313 12.547 9.625 11.0001 9.625C9.45327 9.625 8.1814 8.35313 8.1814 6.80625C8.1814 6.6 8.21577 6.42813 8.25015 6.22188C8.35327 5.80938 8.07827 5.39688 7.66577 5.29375C7.25327 5.19063 6.84077 5.46563 6.73765 5.87813C6.6689 6.1875 6.63452 6.49688 6.63452 6.80625C6.63452 9.2125 8.5939 11.1719 11.0001 11.1719C13.4064 11.1719 15.3658 9.2125 15.3658 6.80625C15.3658 6.49688 15.3314 6.1875 15.2626 5.87813C15.1595 5.46563 14.747 5.225 14.3345 5.29375Z",fill:""})]})}),h.jsx(V,{title:"Total Students",total:s1,rate:"",levelUp:!0,children:h.jsxs("svg",{className:"fill-primary dark:fill-white",width:"22",height:"18",viewBox:"0 0 22 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[h.jsx("path",{d:"M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z",fill:""}),h.jsx("path",{d:"M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z",fill:""}),h.jsx("path",{d:"M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z",fill:""})]})})]}),h.jsxs("div",{className:"flex justify-center gap-4 mb-6",children:[h.jsxs("button",{onClick:()=>C1(m,f,J,`${w}_${j}`),className:"bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded flex items-center",children:[h.jsx("svg",{className:"w-4 h-4 mr-2",fill:"currentColor",viewBox:"0 0 20 20",children:h.jsx("path",{fillRule:"evenodd",d:"M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",clipRule:"evenodd"})}),"Download Excel Gabungan"]}),h.jsxs("button",{onClick:k1,className:"bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded flex items-center",children:[h.jsx("svg",{className:"w-4 h-4 mr-2",fill:"currentColor",viewBox:"0 0 20 20",children:h.jsx("path",{fillRule:"evenodd",d:"M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z",clipRule:"evenodd"})}),"Print Laporan"]})]}),h.jsx(v1,{laporanMitra:m,bulan:w,tahun:j,nextMonth:r,nextYear:P,prevMonth:M,prevYear:t1,paketMitra:J}),h.jsx(j1,{laporanPengeluaranMitra:f,bulan:w,tahun:j,nextMonth:r,nextYear:P,prevMonth:M,prevYear:t1})]})};export{Z1 as default};
