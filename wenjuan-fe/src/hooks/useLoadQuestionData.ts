import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { getQuestionService, getQuestionServiceByLLM } from '../services/question'
import { resetComponents } from '../store/componentsReducer'
import { resetPageInfo } from '../store/pageInfoReducer'
import { useSelector } from 'react-redux'

function useLoadQuestionData() {
  const { id = '' } = useParams()
  const dispatch = useDispatch()
  // 使用 redux 中的 pageInfo 数据
  const { enterFrom = '', llm = '' } = useSelector((state: any) => state.pageInfo)
  // ajax 加载
  const { data, loading, error, run } = useRequest(
    async (id: string, llm: string | null, enterFrom: string | null): Promise<any> => {
      if (!id) throw new Error('没有问卷 id')
      let data
      if (enterFrom === 'confirm') {
        data = await getQuestionServiceByLLM(id, llm)
      } else {
        // 这里假设 getQuestionServiceByLLM 已经被正确导入
        data = await getQuestionService(id)
      }
      return data
    },
    {
      manual: true,
    }
  )

  // 根据获取的 data 设置 redux store
  useEffect(() => {
    if (!data) return

    const {
      title = '',
      desc = '',
      js = '',
      css = '',
      isPublished = false,
      componentList = [],
      enterFrom = '',
      llm = '',
    } = data

    // 获取默认的 selectedId
    let selectedId = ''
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id // 默认选中第一个组件
    }

    // 把 componentList 存储到 Redux store 中
    dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }))

    // 把 pageInfo 存储到 redux store
    dispatch(resetPageInfo({ title, desc, js, css, isPublished, enterFrom, llm }))
  }, [data])

  // 判断 id 变化，执行 ajax 加载问卷数据
  useEffect(() => {
    run(id, llm, enterFrom)
  }, [id])

  return { loading, error }
}

export default useLoadQuestionData
