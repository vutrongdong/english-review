<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PasswordReset extends Notification
{
    use Queueable;

    /**
     * The password reset token.
     *
     * @var string
     */
    public $token;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($token)
    {
        $this->token = $token;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $url_reset_password = config('app.web_url') . '/auth/reset';
        $params = '?email='.urlencode($notifiable->email).'&token='.$this->token;
        return (new MailMessage)
                    ->subject('Đặt lại mật khẩu"')
                    ->line('Bạn nhận được email này vì chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.')
                    ->action('Đặt lại mật khẩu"', url($url_reset_password).$params)
                    ->line('Liên kết đặt lại mật khẩu này sẽ hết hạn sau 60 phút.')
                    ->line('Nếu bạn không yêu cầu đặt lại mật khẩu, bạn không cần thực hiện thêm hành động nào.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
