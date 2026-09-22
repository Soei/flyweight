/* 打包配置文件, 配置文件，请勿移动 src/ */
import path from "path";
function readComponentsRecursive(dir, filter = () => { }) {
    let components = [];
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
        const fullPath = path.join(dir, file.name);
        if (file.isDirectory()) {
            // 递归读取子文件夹
            components = [...components, ...readComponentsRecursive(fullPath, filter)];
        } else {
            const ext = path.extname(file.name);
            if (validExts.includes(ext) && !excludeFiles.includes(file.name)) {
                components.push({ name: path.basename(file.name, ext), ext });
                filter(path.basename(file.name, ext), ext);
            }
        }
    }
    return components;
}

import fs from 'fs';
import components from ".";
const validExts = ['.vue',/*  '.js' */]
const excludeFiles = ['index.js', 'index.vue'];
// 自定义插件：动态改写导出语句
export const rewriteExportPlugin = () => {
    return {
        name: 'rewrite-export', // 插件名称
        // 转换代码的钩子（在打包时处理指定文件）
        transform(code, id) {

            // 只处理你的组件导出文件（替换为实际文件路径，如 src/components/index.js）
            if (id.includes('src/index.js')) {
                console.log(__dirname, ':::::::::::::::::::::::::::::::::');
                const dir = path.resolve(__dirname, 'components');
                let imports = []
                let components = [], exports = [], es = [];
                let names = readComponentsRecursive(dir, (name, ext) => {
                    ext.includes('.js') ? es.push(name) : components.push(name);
                    exports.push(name);
                    imports.push(`import ${name} from './components/${name}${ext}';`)
                });
                let installs = components.join(', ')

                code = code.replace(/\n*\/{2,}\@insert[^\n]*/, `
// 插入代码 START
imports.push(${installs});\n

const outs = {${components}};
${es};
export {outs as components, ${components}};
// imports.forEach(item=>{
//     components[item.name] = item
// })
// 插入代码 END
                `)
                code = imports.join('\n') + '\n' + code;
                console.log(names, '---------------------\n');
                console.log(code);
            }

            return { code };
        },
    };
};