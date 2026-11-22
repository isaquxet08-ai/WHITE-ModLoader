const http = require('http'); const fs = require('fs'); const path = require('path'); const { exec } = require('child_process');
const PORT = 3000; const GAME_DIR = path.join(process.cwd(), 'game'); const MODS_DIR = path.join(GAME_DIR, 'mods'); const BASH_DIR = path.join(GAME_DIR, 'api', 'bash');
if (!fs.existsSync(GAME_DIR)) fs.mkdirSync(GAME_DIR, { recursive: true }); if (!fs.existsSync(MODS_DIR)) fs.mkdirSync(MODS_DIR, { recursive: true }); if (!fs.existsSync(BASH_DIR)) fs.mkdirSync(BASH_DIR, { recursive: true });
const BASH_CONFIG = { ALLOWED_COMMANDS: ['ls', 'cat', 'pwd', 'echo', 'grep', 'find', 'stat', 'head', 'tail', 'mkdir', 'cp', 'uname', 'ps', 'df', 'free'], DANGEROUS_PATTERNS: ['-rf', '-r ', '-f ', 'rm ', 'sudo', 'chmod', 'chown', '>', '>>', '|', '&&', ';', '../', '..\\\\'] };
const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }
    let urlPath = req.url.split('?')[0]; if (urlPath === '/') urlPath = '/index.html';
    if (urlPath === '/api/bash' && req.method === 'POST') {
        let body = ''; req.on('data', c => body += c); req.on('end', () => {
            const cmd = JSON.parse(body).cmd; if(!cmd) return res.end(JSON.stringify({status:'error',msg:'空'}));
            if(!BASH_CONFIG.ALLOWED_COMMANDS.includes(cmd.split(/\s+/)[0])) return res.end(JSON.stringify({status:'error',msg:'拦截'}));
            exec(cmd, {cwd:GAME_DIR}, (err, out, err2) => { res.end(JSON.stringify({ status: err ? 'error' : 'ok', output: out || err2 || (err ? err.message : '') })); });
        }); return;
    }
    if (urlPath === '/index.html') {
        fs.readFile(path.join(GAME_DIR, urlPath), 'utf8', (err, data) => {
            if(err) return res.end('Not Found');
            let scripts = `<script src="/__mod_loader__.js"></script>\n<script src="/app/console.js"></script>\n`;
            fs.readdirSync(BASH_DIR).forEach(f => { if(f.endsWith('.js')) scripts += `<script src="/api/bash/${f}"></script>\n`; });
            fs.readdirSync(MODS_DIR).forEach(f => { if(f.endsWith('.js')) scripts += `<script src="/mods/${f}"></script>\n`; });
            res.end(data.replace('</body>', scripts + '</body>'));
        }); return;
    }
    if (urlPath === '/__mod_loader__.js') return res.end(fs.readFileSync(path.join(__dirname, 'android', 'mod-loader.js'), 'utf8'));
    if (urlPath === '/app/console.js') return res.end(fs.readFileSync(path.join(__dirname, 'android', 'console.js'), 'utf8'));
    if (urlPath.startsWith('/mods/')) return res.end(fs.readFileSync(path.join(MODS_DIR, urlPath.replace('/mods/', '')), 'utf8'));
    if (urlPath.startsWith('/api/bash/')) return res.end(fs.readFileSync(path.join(BASH_DIR, urlPath.replace('/api/bash/', '')), 'utf8'));
    fs.readFile(path.join(GAME_DIR, urlPath), (err, data) => { if(err) { res.writeHead(404); return res.end('Not Found'); } res.end(data); });
});
server.listen(PORT, () => { console.log(`🚀 WHITE Mod Launcher running at http://localhost:${PORT}`); exec(`start http://localhost:${PORT}`); });
