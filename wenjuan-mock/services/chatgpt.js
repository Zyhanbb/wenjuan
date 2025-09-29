const axios = require('axios');
require('dotenv').config();

const JSON5 = require("json5");

function safeParseJSON(str) {
  try {
    // 去掉 markdown 代码块
    let clean = str.replace(/```[a-zA-Z]*\n?/g, "").trim();

    // 交给 JSON5 解析（支持注释、单引号、尾逗号）
    return JSON5.parse(clean);
  } catch (e) {
    console.error("safeParseJSON 失败:", e.message);
    console.log("原始字符串:", str);
    throw e;
  }
}



class ChatGPTService {
    constructor() {
        this.apiKey = process.env.OPENAI_API_KEY;
        //this.baseURL = 'https://api.openai.com/v1/chat/completions';
        this.baseURL = 'https://api.aikeji.vip';
        if (!this.apiKey) {
            console.warn('警告: 未设置OPENAI_API_KEY环境变量，将使用模拟数据');
        }
    }

    /**
     * 生成问卷组件列表
     * @param {string} title - 问卷主题
     * @returns {Promise<Array>} 组件列表
     */
    async generateQuestionnaireComponents(title) {
        if (!this.apiKey) {
            // 如果没有API密钥，返回模拟数据
            return this.getMockComponents(title);
        }

        try {
            const systemPrompt = `你是一个专业的问卷设计助手。请根据我的描述生成一个问卷模板，严格按照以下JSON格式输出： ### 输出格式要求：
json
 [
        // Info
        {
            fe_id: 'c1', // 注意，由于统计页，左侧和中间需要数据完全一直，所以要写死 fe_id ，不能用 Random.id()
            type: 'questionInfo', // 组件类型，不能重复，前后端统一好
            title: '问卷信息',
            isHidden: false,
            isLocked: false,
            props: { title: '问卷标题', desc: '问卷描述...' }
        },
        // Title
        {
            fe_id: 'c2',
            type: 'questionTitle', // 组件类型，不能重复，前后端统一好
            title: '标题',
            isHidden: false,
            isLocked: false,
            props: { text: '个人信息调研', level: 1, isCenter: false }
        },
        // Input
        {
            fe_id: 'c3',
            type: 'questionInput',
            title: '输入框1',
            isHidden: false,
            isLocked: false,
            props: { title: '你的姓名', placeholder: '请输入姓名...' }
        },
        // Input
        {
            fe_id: 'c4',
            type: 'questionInput',
            title: '输入框2',
            isHidden: false,
            isLocked: false,
            props: { title: '你的电话', placeholder: '请输入电话...' }
        },
        // Textarea
        {
            fe_id: 'c5',
            type: 'questionTextarea',
            title: '多行输入',
            isHidden: false,
            isLocked: false,
            props: { title: '你的爱好', placeholder: '请输入...' }
        },
        // Paragraph
        {
            fe_id: 'c6',
            type: 'questionParagraph',
            title: '段落',
            isHidden: false,
            isLocked: false,
            props: { text: '一行段落1\n一行段落2', isCenter: false }
        },
        // Radio
        {
            fe_id: 'c7',
            type: 'questionRadio',
            title: '单选',
            isHidden: false,
            isLocked: false,
            props: {
                title: '单选标题',
                isVertical: false,
                options: [
                  { value: 'item1', text: '选项1' },
                  { value: 'item2', text: '选项2' },
                  { value: 'item3', text: '选项3' },
                ],
                value: '',
              }
        },
        // Checkbox
        {
            fe_id: 'c8',
            type: 'questionCheckbox',
            title: '多选',
            isHidden: false,
            isLocked: false,
            props: {
                title: '多选标题',
                isVertical: false,
                list: [
                    { value: 'item1', text: '选项1', checked: true },
                    { value: 'item2', text: '选项2', checked: false },
                    { value: 'item3', text: '选项3', checked: false },
                ],
              }
        }
    ]
### 可用的组件类型和属性： 1. **questionInfo** - 问卷信息 - props: { title: string, desc: string } 2. **questionTitle** - 标题 - props: { text: string, level: 1|2|3|4|5, isCenter: boolean } 3. **questionInput** - 输入框 - props: { title: string, placeholder: string } 4. **questionTextarea** - 多行输入 - props: { title: string, placeholder: string } 5. **questionParagraph** - 段落 - props: { text: string, isCenter: boolean } 6. **questionRadio** - 单选 - props: { title: string, isVertical: boolean, options: [{ value: string, text: string }], value: string } 7. **questionCheckbox** - 多选 - props: { title: string, isVertical: boolean, list: [{ value: string, text: string, checked: boolean }] } ### 生成规则： 1. 必须包含一个 questionInfo 组件作为问卷头部 2. fe_id 按顺序递增：c1, c2, c3... 3. 根据我的描述选择合适的组件类型 4. 为每个组件设置合理的 props 值 5. 选项的 value 使用 item1, item2, item3... 格式 6. 所有 isHidden 和 isLocked 都设为 false`;

            const userPrompt = `我的问卷需求：${title}。请根据我的描述生成完整的问卷模板JSON。`;

            const response = await axios.post(this.baseURL + "/v1/chat/completions", {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                temperature: 0.7,
                max_tokens: 2000
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            const choices = response?.data?.choices;
            if (!choices || choices.length === 0) {
                console.log("最终请求地址:", this.baseURL + "/v1/chat/completions");

                console.log("API 原始返回:", JSON.stringify(response.data, null, 2));

                throw new Error('API 返回结果为空');
            }
            const content = choices[0].message.content;


            // 尝试解析JSON
            try {
                const components = safeParseJSON(content);
                return this.validateAndFormatComponents(components);
            } catch (parseError) {
                console.error("解析ChatGPT返回的JSON失败:", parseError.message);
                console.log("原始内容:", content);
                return this.getMockComponents(title || "默认问卷");
            }


        } catch (error) {
            console.error('调用ChatGPT API失败:', error.message);
            return this.getMockComponents(title || '默认问卷');
        }
    }

    /**
     * 验证和格式化组件数据
     */
    validateAndFormatComponents(components) {
        if (!Array.isArray(components)) {
            return this.getMockComponents('默认问卷');
        }

        return components.map((component, index) => ({
            fe_id: component.fe_id || `c${index + 1}`,
            type: component.type || 'questionParagraph',
            title: component.title || '未命名组件',
            isHidden: Boolean(component.isHidden),
            isLocked: Boolean(component.isLocked),
            props: component.props || {}
        }));
    }

    /**
     * 获取模拟组件数据（当API不可用时）
     */
    getMockComponents(title) {
        const baseComponents = [
            {
                fe_id: "c1",
                type: "questionInfo",
                title: "问卷信息",
                isHidden: false,
                isLocked: false,
                props: {
                    title: `${title}调查问卷`,
                    desc: `本问卷旨在了解您对${title}的看法和意见，所有信息仅用于研究分析，请放心填写。`
                }
            },
            {
                fe_id: "c2",
                type: "questionTitle",
                title: "标题",
                isHidden: false,
                isLocked: false,
                props: { text: "基本信息", level: 1, isCenter: false }
            },
            {
                fe_id: "c3",
                type: "questionInput",
                title: "输入框1",
                isHidden: false,
                isLocked: false,
                props: { title: "您的年龄", placeholder: "请输入年龄..." }
            },
            {
                fe_id: "c4",
                type: "questionRadio",
                title: "单选1",
                isHidden: false,
                isLocked: false,
                props: {
                    title: "您的性别",
                    isVertical: false,
                    options: [
                        { value: "item1", text: "男" },
                        { value: "item2", text: "女" },
                        { value: "item3", text: "其他/不便透露" }
                    ],
                    value: ""
                }
            },
            {
                fe_id: "c5",
                type: "questionTitle",
                title: "标题2",
                isHidden: false,
                isLocked: false,
                props: { text: `关于${title}的问题`, level: 1, isCenter: false }
            },
            {
                fe_id: "c6",
                type: "questionRadio",
                title: "单选2",
                isHidden: false,
                isLocked: false,
                props: {
                    title: `您对${title}的了解程度如何？`,
                    isVertical: true,
                    options: [
                        { value: "item1", text: "非常了解" },
                        { value: "item2", text: "比较了解" },
                        { value: "item3", text: "一般了解" },
                        { value: "item4", text: "不太了解" },
                        { value: "item5", text: "完全不了解" }
                    ],
                    value: ""
                }
            },
            {
                fe_id: "c7",
                type: "questionCheckbox",
                title: "多选1",
                isHidden: false,
                isLocked: false,
                props: {
                    title: `您认为${title}的哪些方面最重要？（可多选）`,
                    isVertical: true,
                    list: [
                        { value: "item1", text: "实用性", checked: false },
                        { value: "item2", text: "便利性", checked: false },
                        { value: "item3", text: "成本效益", checked: false },
                        { value: "item4", text: "创新性", checked: false },
                        { value: "item5", text: "环保性", checked: false }
                    ]
                }
            },
            {
                fe_id: "c8",
                type: "questionTextarea",
                title: "多行输入1",
                isHidden: false,
                isLocked: false,
                props: {
                    title: `请分享您对${title}的具体看法或建议`,
                    placeholder: "请输入您的想法..."
                }
            },
            {
                fe_id: "c9",
                type: "questionParagraph",
                title: "段落",
                isHidden: false,
                isLocked: false,
                props: {
                    text: "感谢您的参与！\n您的回答对我们非常重要。",
                    isCenter: true
                }
            }
        ];

        return baseComponents;
    }
}

module.exports = new ChatGPTService();
