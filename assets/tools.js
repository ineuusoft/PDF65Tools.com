// ---- Tool registry ----
const tools = [
  { id: 'merge',       name: 'PDF Merge',        desc: 'Combine PDFs',                  content: pdfMergeContent },
  { id: 'split',       name: 'PDF Split',        desc: 'Split PDFs',                    content: pdfSplitContent },
  { id: 'compress',    name: 'PDF Compressor',   desc: 'Reduce size',                   content: pdfCompressContent },
  { id: 'pdftoword',   name: 'PDF to Word',      desc: 'Convert PDF to DOCX',           content: pdfToWordContent },
  { id: 'wordtopdf',   name: 'Word to PDF',      desc: 'Convert DOCX to PDF',           content: wordToPdfContent },
  { id: 'pdftoexcel',  name: 'PDF to Excel',     desc: 'Convert PDF to XLSX',           content: pdfToExcelContent },
  { id: 'exceltopdf',  name: 'Excel to PDF',     desc: 'Convert XLSX to PDF',           content: excelToPdfContent },
  { id: 'pdftoppt',    name: 'PDF to PPT',       desc: 'PDF to PowerPoint',             content: pdfToPptContent },
  { id: 'ppttopdf',    name: 'PPT to PDF',       desc: 'PowerPoint to PDF',             content: pptToPdfContent },
  { id: 'pdftojpg',    name: 'PDF to JPG',       desc: 'PDF to image',                  content: pdfToJpgContent },
  { id: 'jpgtopdf',    name: 'JPG to PDF',       desc: 'Image to PDF',                  content: jpgToPdfContent },
  { id: 'pdfprotect',  name: 'PDF Protect',      desc: 'Password PDF',                  content: pdfProtectContent },
  { id: 'pdfunlock',   name: 'PDF Unlock',       desc: 'Remove PDF password',           content: pdfUnlockContent },
  { id: 'pdfrotate',   name: 'PDF Rotate',       desc: 'Rotate pages',                  content: pdfRotateContent },
  { id: 'pdfcrop',     name: 'PDF Crop',         desc: 'Crop PDF',                      content: pdfCropContent },
  { id: 'pdfreorder',  name: 'PDF Page Reorder', desc: 'Rearrange pages',               content: pdfReorderContent },
  { id: 'pdfdeletepage',name:'PDF Page Delete',  desc: 'Remove pages',                  content: pdfDeletePageContent },
  { id: 'pdfannotate', name: 'PDF Annotate',     desc: 'Add notes',                     content: pdfAnnotateContent },
  { id: 'pdfsign',     name: 'PDF Sign',         desc: 'Add signature',                 content: pdfSignContent },
  { id: 'pdfwatermark',name: 'PDF Watermark',    desc: 'Watermark PDF',                 content: pdfWatermarkContent },
  { id: 'pdftotext',   name: 'PDF to Text',      desc: 'Extract text',                  content: pdfToTextContent },
  { id: 'pdftohtml',   name: 'PDF to HTML',      desc: 'Convert to HTML',               content: pdfToHtmlContent },
  { id: 'htmltopdf',   name: 'HTML to PDF',      desc: 'Webpage to PDF',                content: htmlToPdfContent },
  { id: 'pdfrepair',   name: 'PDF Repair',       desc: 'Fix corrupted PDF',             content: pdfRepairContent },
  { id: 'pdfextract',  name: 'PDF Page Extract', desc: 'Extract pages',                 content: pdfExtractContent },
  { id: 'pdfmetadata', name: 'PDF Metadata Editor',desc:'Edit PDF info',                content: pdfMetadataContent },
  { id: 'pdfredact',   name: 'PDF Redact',       desc: 'Hide info',                     content: pdfRedactContent },
  { id: 'pdfbates',    name: 'PDF Bates Numbering',desc:'Bates numbering',              content: pdfBatesContent },
  { id: 'pdfgrayscale',name: 'PDF Grayscale',    desc: 'Black & white',                 content: pdfGrayscaleContent },
  { id: 'pdfreader',   name: 'PDF Reader',       desc: 'Read PDF',                      content: pdfReaderContent },
  { id: 'pdfformfill', name: 'PDF Form Filler',  desc: 'Fill PDF forms',                content: pdfFormFillContent }
];

// ---- Tool content functions ----
function pdfMergeContent() { /* ...see previous chunks... */ }
function pdfSplitContent() { /* ...see previous chunks... */ }
function pdfCompressContent() { /* ...see previous chunks... */ }
function pdfToWordContent() { /* ...see previous chunks... */ }
function wordToPdfContent() { /* ...see previous chunks... */ }
function pdfToExcelContent() { /* ...see previous chunks... */ }
function excelToPdfContent() { /* ...see previous chunks... */ }
function pdfToPptContent() { /* ...see previous chunks... */ }
function pptToPdfContent() { /* ...see previous chunks... */ }
function pdfToJpgContent() { /* ...see previous chunks... */ }
function jpgToPdfContent() { /* ...see previous chunks... */ }
function pdfProtectContent() { /* ...see previous chunks... */ }
function pdfUnlockContent() { /* ...see previous chunks... */ }
function pdfRotateContent() { /* ...see previous chunks... */ }
function pdfCropContent() { /* ...see previous chunks... */ }
function pdfReorderContent() { /* ...see previous chunks... */ }
function pdfDeletePageContent() { /* ...see previous chunks... */ }
function pdfAnnotateContent() { /* ...see previous chunks... */ }
function pdfSignContent() { /* ...see previous chunks... */ }
function pdfWatermarkContent() { /* ...see previous chunks... */ }
function pdfToTextContent() { /* ...see previous chunks... */ }
function pdfToHtmlContent() { /* ...see previous chunks... */ }
function htmlToPdfContent() { /* ...see previous chunks... */ }
function pdfRepairContent() { /* ...see previous chunks... */ }
function pdfExtractContent() { /* ...see previous chunks... */ }
function pdfMetadataContent() { /* ...see previous chunks... */ }
function pdfRedactContent() { /* ...see previous chunks... */ }
function pdfBatesContent() { /* ...see previous chunks... */ }
function pdfGrayscaleContent() { /* ...see previous chunks... */ }
function pdfReaderContent() { /* ...see previous chunks... */ }
function pdfFormFillContent() { /* ...see previous chunks... */ }

// ---- Render grid ----
const grid = document.getElementById('toolGrid');
tools.forEach(t => {
  const el = document.createElement('div');
  el.className = 'tool-card';
  el.tabIndex = 0;
  el.setAttribute('role','button');
  el.setAttribute('aria-label', t.name);
  el.innerHTML = `<span>${t.name}</span><small>${t.desc}</small>`;
  el.onclick = () => openToolModal(t);
  el.onkeypress = e => { if(e.key==='Enter') openToolModal(t); };
  grid.appendChild(el);
});

// ---- Modal logic ----
const modal = document.getElementById('toolModal');
const closeBtn = document.getElementById('modalClose');
const modalContent = document.getElementById('modalToolContent');
function openToolModal(tool) {
  modalContent.innerHTML = tool.content();
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  closeBtn.focus();
  setTimeout(() => attachToolEvents(tool.id), 100);
}
function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = '';
  modalContent.innerHTML = '';
}
closeBtn.onclick = closeModal;
document.getElementById('modalBackdrop').onclick = closeModal;
window.onkeydown = e => { if(e.key==='Escape' && modal.style.display==='flex') closeModal(); };

// ---- Tool handlers ----
function attachToolEvents(id) {
  // PDF Merge
  if(id === 'merge') {
    const input = document.getElementById('merge-file-input');
    const fileList = document.getElementById('merge-file-list');
    const mergeBtn = document.getElementById('merge-btn');
    const resultDiv = document.getElementById('merge-result');
    let pdfFiles = [];
    if (!input) return;
    input.onchange = function() {
      pdfFiles = Array.from(input.files);
      fileList.innerHTML = '';
      if (pdfFiles.length === 0) { mergeBtn.disabled = true; return; }
      pdfFiles.forEach((f,i) => {
        const item = document.createElement('div');
        item.textContent = (i+1) + '. ' + f.name + ' (' + (f.size/1024).toFixed(1) + ' KB)';
        fileList.appendChild(item);
      });
      mergeBtn.disabled = false;
    };
    mergeBtn.onclick = async function() {
      if (pdfFiles.length < 2) { alert('Select at least two PDF files.'); return; }
      mergeBtn.disabled = true;
      resultDiv.innerHTML = 'Merging...';
      try {
        const mergedPdf = await PDFLib.PDFDocument.create();
        for (const file of pdfFiles) {
          const arrayBuffer = await file.arrayBuffer();
          const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
          const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
          copiedPages.forEach(page => mergedPdf.addPage(page));
        }
        const mergedBytes = await mergedPdf.save();
        const blob = new Blob([mergedBytes], {type: 'application/pdf'});
        const url = URL.createObjectURL(blob);
        resultDiv.innerHTML = `<a href="${url}" download="merged.pdf" class="button-link">Download merged PDF</a>`;
      } catch (err) {
        resultDiv.textContent = 'Error merging PDFs: ' + err.message;
      }
      mergeBtn.disabled = false;
    };
    return;
  }
  // PDF Split (basic)
  if(id === 'split') {
    const input = document.getElementById('split-file-input');
    const info = document.getElementById('split-file-info');
    const rangeInput = document.getElementById('split-range');
    const splitBtn = document.getElementById('split-btn');
    const resultDiv = document.getElementById('split-result');
    let pdfFile = null, pageCount = 0;
    if(!input) return;
    input.onchange = async function() {
      pdfFile = input.files[0];
      info.innerHTML = '';
      splitBtn.disabled = !pdfFile;
      if(pdfFile) {
        try {
          const buffer = await pdfFile.arrayBuffer();
          const pdfDoc = await PDFLib.PDFDocument.load(buffer);
          pageCount = pdfDoc.getPageCount();
          info.innerHTML = `Pages: ${pageCount}`;
        } catch (e) {
          info.innerHTML = 'Invalid PDF file.';
          splitBtn.disabled = true;
        }
      }
    };
    splitBtn.onclick = async function() {
      if(!pdfFile) return;
      splitBtn.disabled = true;
      resultDiv.innerHTML = 'Splitting...';
      try {
        const buffer = await pdfFile.arrayBuffer();
        const srcDoc = await PDFLib.PDFDocument.load(buffer);
        let pages = [];
        const range = rangeInput.value.trim();
        if(range) {
          range.split(',').forEach(seg => {
            if(seg.includes('-')) {
              let [a,b] = seg.split('-').map(x=>parseInt(x)-1);
              for(let i=a;i<=b;i++) pages.push(i);
            } else {
              pages.push(parseInt(seg)-1);
            }
          });
        } else {
          for(let i=0;i<srcDoc.getPageCount();i++) pages.push(i);
        }
        pages = pages.filter(i=>i>=0 && i<srcDoc.getPageCount());
        if(pages.length===0) throw new Error('No valid pages/range');
        const newDoc = await PDFLib.PDFDocument.create();
        const copied = await newDoc.copyPages(srcDoc, pages);
        copied.forEach(p=>newDoc.addPage(p));
        const out = await newDoc.save();
        const blob = new Blob([out], {type:'application/pdf'});
        const url = URL.createObjectURL(blob);
        resultDiv.innerHTML = `<a href="${url}" download="split.pdf" class="button-link">Download split PDF</a>`;
      } catch(e) {
        resultDiv.innerHTML = 'Error: ' + e.message;
      }
      splitBtn.disabled = false;
    };
    return;
  }
  // PDF Compress (simple)
  if(id === 'compress') {
    const input = document.getElementById('compress-file-input');
    const btn = document.getElementById('compress-btn');
    const resultDiv = document.getElementById('compress-result');
    let pdfFile = null;
    if(!input) return;
    input.onchange = () => { pdfFile = input.files[0]; btn.disabled = !pdfFile; };
    btn.onclick = async function() {
      if(!pdfFile) return;
      btn.disabled = true;
      resultDiv.innerHTML = 'Compressing...';
      try {
        const buffer = await pdfFile.arrayBuffer();
        const pdfDoc = await PDFLib.PDFDocument.load(buffer);
        const out = await pdfDoc.save();
        const blob = new Blob([out], {type:'application/pdf'});
        const url = URL.createObjectURL(blob);
        resultDiv.innerHTML = `<a href="${url}" download="compressed.pdf" class="button-link">Download compressed PDF</a><br><small>Note: For best compression, use dedicated server tools.</small>`;
      } catch(e) {
        resultDiv.innerHTML = 'Error: ' + e.message;
      }
      btn.disabled = false;
    };
    return;
  }
  // PDF to JPG (all pages)
  if(id === 'pdftojpg') {
    const input = document.getElementById('pdf2jpg-file-input');
    const btn = document.getElementById('pdf2jpg-btn');
    const resultDiv = document.getElementById('pdf2jpg-result');
    let pdfFile = null;
    if(!input) return;
    input.onchange = () => { pdfFile = input.files[0]; btn.disabled = !pdfFile; };
    btn.onclick = async function() {
      if(!pdfFile) return;
      btn.disabled = true;
      resultDiv.innerHTML = 'Converting...';
      try {
        const buffer = await pdfFile.arrayBuffer();
        const loadingTask = window.pdfjsLib.getDocument({data: buffer});
        const pdf = await loadingTask.promise;
        let imagesHtml = '';
        for(let i=1;i<=pdf.numPages;i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({scale:2});
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width; canvas.height = viewport.height;
          await page.render({canvasContext:canvas.getContext('2d'),viewport}).promise;
          const url = canvas.toDataURL('image/jpeg',0.95);
          imagesHtml += `<a href="${url}" download="page${i}.jpg"><img src="${url}" style="width:100px;margin:8px;border-radius:6px;" alt="Page ${i}"></a>`;
        }
        resultDiv.innerHTML = imagesHtml || 'No images found.';
      } catch(e) {
        resultDiv.innerHTML = 'Error: ' + e.message;
      }
      btn.disabled = false;
    };
    return;
  }
  // JPG to PDF
  if(id === 'jpgtopdf') {
    const input = document.getElementById('jpg2pdf-file-input');
    const btn = document.getElementById('jpg2pdf-btn');
    const resultDiv = document.getElementById('jpg2pdf-result');
    let imgFiles = [];
    if(!input) return;
    input.onchange = () => { imgFiles = Array.from(input.files); btn.disabled = imgFiles.length===0; };
    btn.onclick = async function() {
      if(imgFiles.length===0) return;
      btn.disabled = true;
      resultDiv.innerHTML = 'Converting...';
      try {
        const pdfDoc = await PDFLib.PDFDocument.create();
        for(const file of imgFiles) {
          const imgBytes = await file.arrayBuffer();
          const img = await pdfDoc.embedJpg(imgBytes);
          const page = pdfDoc.addPage([img.width, img.height]);
          page.drawImage(img, {x:0, y:0, width:img.width, height:img.height});
        }
        const out = await pdfDoc.save();
        const blob = new Blob([out], {type:'application/pdf'});
        const url = URL.createObjectURL(blob);
        resultDiv.innerHTML = `<a href="${url}" download="images.pdf" class="button-link">Download PDF</a>`;
      } catch(e) {
        resultDiv.innerHTML = 'Error: ' + e.message;
      }
      btn.disabled = false;
    };
    return;
  }
  // PDF to Text (all pages)
  if(id === 'pdftotext') {
    const input = document.getElementById('pdftotext-file-input');
    const btn = document.getElementById('pdftotext-btn');
    const resultDiv = document.getElementById('pdftotext-result');
    let pdfFile = null;
    if(!input) return;
    input.onchange = () => { pdfFile = input.files[0]; btn.disabled = !pdfFile; };
    btn.onclick = async function() {
      if(!pdfFile) return;
      btn.disabled = true;
      resultDiv.innerHTML = 'Extracting text...';
      try {
        const buffer = await pdfFile.arrayBuffer();
        const loadingTask = window.pdfjsLib.getDocument({data: buffer});
        const pdf = await loadingTask.promise;
        let text = '';
        for(let i=1;i<=pdf.numPages;i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map(item=>item.str).join(' ') + '\n\n';
        }
        resultDiv.innerHTML = `<textarea style="width:99%;min-height:220px;">${text.trim()}</textarea>`;
      } catch(e) {
        resultDiv.innerHTML = 'Error: ' + e.message;
      }
      btn.disabled = false;
    };
    return;
  }
  // PDF Reader
  if(id === 'pdfreader') {
    const input = document.getElementById('pdfreader-file-input');
    const viewer = document.getElementById('pdfreader-viewer');
    if(!input) return;
    input.onchange = async function() {
      const pdfFile = input.files[0];
      if(!pdfFile) return;
      viewer.innerHTML = 'Loading...';
      try {
        const buffer = await pdfFile.arrayBuffer();
        const loadingTask = window.pdfjsLib.getDocument({data: buffer});
        const pdf = await loadingTask.promise;
        let html = '';
        for(let i=1;i<=pdf.numPages;i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({scale:1.2});
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width; canvas.height = viewport.height;
          await page.render({canvasContext:canvas.getContext('2d'),viewport}).promise;
          html += `<div style="margin-bottom:1em"><span style="font-size:0.93em;color:#666;">Page ${i}</span><br><img src="${canvas.toDataURL()}" style="width:100%;max-width:600px;border-radius:8px;box-shadow:0 2px 8px #eee"></div>`;
        }
        viewer.innerHTML = html;
      } catch(e) {
        viewer.innerHTML = 'Error: ' + e.message;
      }
    };
    return;
  }

  // For all other tools, simply enable button if file is selected (for future expansion)
  const btns = document.querySelectorAll('button');
  const inputs = document.querySelectorAll('input[type="file"]');
  inputs.forEach(input=>{
    input.addEventListener('change',function(){
      btns.forEach(btn=>{
        if (input.files && input.files.length > 0) btn.disabled = false;
      });
    });
  });
}
