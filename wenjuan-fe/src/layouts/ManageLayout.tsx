import React, { FC, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Button, Space, Divider, message } from 'antd'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { createQuestionService } from '../services/question'
import QuestionTitleModal from '../components/QuestionTitleModal'
import styles from './ManageLayout.module.scss'
import { useDispatch } from 'react-redux'
import { changeEnterFrom, changeLLM } from '../store/pageInfoReducer'

const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [modalVisible, setModalVisible] = useState(false)
  const [currentQuestionId, setCurrentQuestionId] = useState<string>('')
  const dispatch = useDispatch()
  const {
    loading,
    // error,
    run: handleCreateClick,
  } = useRequest(createQuestionService, {
    manual: true,
    onSuccess(result) {
      // 保存问卷ID并显示标题设置弹窗
      setCurrentQuestionId(result.id)
      setModalVisible(true)
      message.success('问卷创建成功')
    },
  })

  // 确定设置标题
  const handleConfirmTitle = (title: string) => {
    console.log('设置问卷标题:', title)
    dispatch(changeEnterFrom('confirm'))
    dispatch(changeLLM(title))
    setModalVisible(false)
    nav(`/question/edit/${currentQuestionId}`)
    message.success('标题设置成功')
  }

  // 跳过设置标题
  const handleSkipTitle = () => {
    setModalVisible(false)
    dispatch(changeEnterFrom('skip'))
    nav(`/question/edit/${currentQuestionId}`)
  }

  // 取消弹窗
  const handleCancelModal = () => {
    setModalVisible(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handleCreateClick}
            disabled={loading}
          >
            新建问卷
          </Button>
          <Divider style={{ borderTop: 'transparent' }} />
          <Button
            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => nav('/manage/list')}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
            size="large"
            icon={<StarOutlined />}
            onClick={() => nav('/manage/star')}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => nav('/manage/trash')}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>

      {/* 问卷标题设置弹窗 */}
      <QuestionTitleModal
        visible={modalVisible}
        onConfirm={handleConfirmTitle}
        onSkip={handleSkipTitle}
        onCancel={handleCancelModal}
        loading={false}
      />
    </div>
  )
}

export default ManageLayout
