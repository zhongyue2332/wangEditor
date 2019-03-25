/*
    上传文件
*/

// 构造函数
function UploadFile(editor) {
    this.editor = editor
    this.inputTextId = null
}

// 原型
UploadFile.prototype = {
    constructor: UploadFile,

    // 根据 debug 弹出不同的信息
    _alert: function (alertInfo, debugInfo) {
        const editor = this.editor
        const debug = editor.config.debug
        const customAlert = editor.config.customAlert

        if (debug) {
            throw new Error('wangEditor: ' + (debugInfo || alertInfo))
        } else {
            if (customAlert && typeof customAlert === 'function') {
                customAlert(alertInfo)
            } else {
                alert(alertInfo)
            }
        }
    },

    // 将链接回填至input框
    writeLinkToInput: function (link) {
        if (!link) {
            return
        }
        const ipt = document.getElementById(this.inputTextId)
        ipt.value = link
        // const editor = this.editor
        // const config = editor.config

        // // 校验格式
        // const linkImgCheck = config.linkImgCheck
        // let checkResult
        // if (linkImgCheck && typeof linkImgCheck === 'function') {
        //     checkResult = linkImgCheck(link)
        //     if (typeof checkResult === 'string') {
        //         // 校验失败，提示信息
        //         alert(checkResult)
        //         return
        //     }
        // }

        // editor.cmd.do('insertHTML', `<img src="${link}" style="max-width:100%;"/>`)

    },

    // 上传文件
    uploadFile: function (files, inputTextId) {
        if (!files || !files.length) {
            return
        }

        // ------------------------------ 获取配置信息 ------------------------------
        const editor = this.editor
        const config = editor.config
        const customUploadFile = config.customUploadFile
        const isUploadFile = config.isUploadFile
        this.inputTextId = inputTextId
        if (isUploadFile && !customUploadFile) {
            this._alert('请配置customUploadFile参数!')
            return
        }       
        // ------------------------------ 自定义上传 ------------------------------
        if (customUploadFile && typeof customUploadFile === 'function') {
            customUploadFile(files, this.writeLinkToInput.bind(this))

            // 阻止以下代码执行
            return
        }    
    }
}

export default UploadFile