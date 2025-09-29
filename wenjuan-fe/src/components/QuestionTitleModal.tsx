import React, { FC, useState } from 'react'
import { Modal, Input, message } from 'antd'

interface QuestionTitleModalProps {
  visible: boolean
  onCancel: () => void
  onConfirm: (title: string) => void
  onSkip: () => void
  loading?: boolean
}

const QuestionTitleModal: FC<QuestionTitleModalProps> = ({
  visible,
  onCancel,
  onConfirm,
  onSkip,
  loading = false,
}) => {
  const [title, setTitle] = useState('')

  const handleConfirm = () => {
    if (!title.trim()) {
      message.warning('请输入你的需求')
      return
    }
    onConfirm(title.trim())
    setTitle('') // 清空输入
  }

  const handleSkip = () => {
    onSkip()
    setTitle('') // 清空输入
  }

  const handleCancel = () => {
    onCancel()
    setTitle('') // 清空输入
  }

  return (
    <Modal
      title="我将会用LLM帮你生成一个基础问卷模板，说出你的想法吧！"
      open={visible}
      onCancel={handleCancel}
      okText="确定"
      cancelText="跳过"
      onOk={handleConfirm}
      confirmLoading={loading}
      cancelButtonProps={{
        onClick: handleSkip,
      }}
      width={580}
      bodyStyle={{ height: '300px' }}
      centered
      maskClosable={false}
    >
      <div style={{ padding: '20px 0' }}>
        <Input.TextArea
          placeholder="请输入你的需求"
          value={title}
          onChange={e => setTitle(e.target.value)}
          maxLength={300}
          showCount
          rows={10} //固定高度
        />
      </div>
    </Modal>
  )
}

export default QuestionTitleModal
